document.addEventListener("DOMContentLoaded", () => {
  const loginBtn = document.getElementById("loginBtn");
  const signupBtn = document.getElementById("signupBtn");
  const switchBtn = document.getElementById("switchBtn");
  const container = document.querySelector(".cont");

  switchBtn.addEventListener("click", () => {
    container.classList.toggle("s--signup");
  });

  loginBtn.addEventListener("click", async () => {
    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value.trim();

    try {
      const res = await fetch("http://3.36.128.91:8080/api/v1/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      if (res.ok) {
        alert("로그인 성공!");
        window.location.href = "/mypage";
      } else {
        const error = await res.json();
        alert("로그인 실패: " + (error.message || res.status));
      }
    } catch (err) {
      console.error(err);
      alert("서버 연결 오류: " + err.message);
    }
  });

  signupBtn.addEventListener("click", async () => {
    const name = document.getElementById("signupName").value.trim();
    const email = document.getElementById("signupEmail").value.trim();
    const password = document.getElementById("signupPassword").value.trim();

    try {
      const res = await fetch("http://3.36.128.91:8080/api/v1/user/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password })
      });

      if (res.ok) {
        alert("회원가입 성공! 이제 로그인하세요.");
        container.classList.remove("s--signup");
      } else {
        const error = await res.json();
        alert("회원가입 실패: " + (error.message || res.status));
      }
    } catch (err) {
      console.error(err);
      alert("서버 연결 오류: " + err.message);
    }
  });
});
