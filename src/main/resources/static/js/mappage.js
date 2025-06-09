// /js/mappage.js
window.onload = async function () {
  // ✅ 지도 로딩 (신사동 기준)
  const container = document.getElementById('map');
  const defaultCenter = new kakao.maps.LatLng(37.5172, 127.0208);
  const mapOptions = { center: defaultCenter, level: 3 };
  const map = new kakao.maps.Map(container, mapOptions);

  // ✅ 현재 위치 가져오기
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(pos => {
      const userLoc = new kakao.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
      map.setCenter(userLoc);
      new kakao.maps.Marker({ map, position: userLoc, title: '현재 위치' });
    });
  }

  // ——————————————————————————
  // 0) 태그 불러오기 & 버튼 생성
  const tagsContainer = document.getElementById('tagsContainer');
  let selectedTags = [];
  try {
    const res = await fetch('http://3.36.128.91:8080/api/v1/tags', { method: 'GET' });
    const { tags } = await res.json();  // 변경: 서버 반환 필드 이름에 맞춰 tags 사용

    tags.forEach(tagName => {
      const btn = document.createElement('button');
      btn.textContent = tagName;
      btn.addEventListener('click', () => {
        btn.classList.toggle('active');
        if (btn.classList.contains('active')) selectedTags.push(tagName);
        else selectedTags = selectedTags.filter(t => t !== tagName);
      });
      tagsContainer.appendChild(btn);
    });

    // 기본 자동 선택: "맛집"
    const defaultBtn = Array.from(tagsContainer.children).find(b => b.textContent === '맛집');
    if (defaultBtn) {
      defaultBtn.classList.add('active');
      selectedTags.push('맛집');
    }
  } catch (e) {
    console.error('태그 로드 실패:', e);
  }

  // 1) 검색 함수 정의 (query + tags)
async function searchPlaces(query) {
  try {
    const response = await fetch('http://3.36.128.91:8080/api/v1/search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, tags: selectedTags })
    });
    if (!response.ok) throw new Error(response.statusText);

    const data = await response.json();
    const shopList = document.querySelector('.shop-list');
    shopList.innerHTML = '';  // 기존 카드 제거

    // 최대 6개까지만 렌더링
    data.documents
      .slice(0, 6)
      .forEach(place => {
        const card = document.createElement('div');
        card.className = 'shop-card';
        card.innerHTML = `
          <h3>${place.place_name}</h3>
          <p>${place.road_address_name || place.address_name}</p>
          <p>${place.phone || '전화번호 없음'}</p>
          <a href="${place.place_url}" target="_blank">카카오맵에서 보기</a>
        `;
        shopList.appendChild(card);
      });
  } catch (error) {
    console.error('검색 실패:', error);
  }
}


  // 2) GO! 버튼 이벤트
  const searchInput = document.getElementById('searchInput');
  const searchBtn   = document.getElementById('searchBtn');
  searchBtn.addEventListener('click', () => {
    const q = searchInput.value.trim();
    if (q) searchPlaces(q);
  });

  // 3) 초기 자동 검색: "신사동 음식점" + ["맛집"]
  searchPlaces('신사동 음식점');

  // ——————————————————————————
  // ✅ 사이드바 토글 (sidebar.js에 있으면 중복 제거 가능)
  const navButton = document.querySelector('.nav-button');
  const navPopup  = document.querySelector('.nav-popup');
  if (navButton && navPopup) {
    navButton.addEventListener('click', () => navPopup.classList.toggle('hidden'));
  }
};
