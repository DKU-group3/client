
window.onload = async function () {
  // ✅ 지도 로딩
  const container = document.getElementById('map');
  const defaultCenter = new kakao.maps.LatLng(37.5665, 126.9780); // 서울 시청 기준
  const mapOptions = {
    center: defaultCenter,
    level: 3
  };
  const map = new kakao.maps.Map(container, mapOptions);

  // ✅ 현재 위치 가져오기
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;
      const userLoc = new kakao.maps.LatLng(lat, lng);
      map.setCenter(userLoc);
      new kakao.maps.Marker({
        map,
        position: userLoc,
        title: '현재 위치'
      });
    });
  }

  // ✅ 가게 정보 요청 및 렌더링
  try {
    const response = await fetch('http://3.36.128.91:8080/api/v1/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ query: '맛집' })
    });

    if (!response.ok) throw new Error('API 요청 실패');

    const data = await response.json();
    const shopList = document.querySelector('.shop-list');
    shopList.innerHTML = ''; // 기존 예시 카드 제거

    data.documents.forEach(place => {
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
    console.error('가게 데이터 로딩 실패:', error);
  }

  // ✅ 사이드바 토글
  const navButton = document.querySelector('.nav-button');
  const navPopup = document.querySelector('.nav-popup');
  navButton.addEventListener('click', () => {
    navPopup.classList.toggle('hidden');
  });
};


