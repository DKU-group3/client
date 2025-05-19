// 로그인 버튼 클릭 시 /main으로 이동
document.addEventListener("DOMContentLoaded", function () {
  const loginBtn = document.getElementById("loginBtn");
  const switchBtn = document.getElementById("switchBtn");
  const container = document.querySelector(".cont");

  loginBtn.addEventListener("click", function () {
    // 나중에 실제 로그인 로직으로 교체 가능
    window.location.href = "/search";
  });

  switchBtn.addEventListener("click", function () {
    container.classList.toggle("s--signup");
  });
});
