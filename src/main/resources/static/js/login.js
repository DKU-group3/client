// 로그인 버튼 클릭 시 /main으로 이동
document.addEventListener("DOMContentLoaded", function () {
  const loginBtn = document.getElementById("loginBtn");
  const switchBtn = document.getElementById("switchBtn");
  const container = document.querySelector(".cont");
  const signupBtn = document.getElementById("signupBtn");
  const signupEmail = document.getElementById("signupEmail");
  const signupPassword = document.getElementById("signupPassword");
  const signupName = document.getElementById("signupName");

  loginBtn.addEventListener("click", function () {
    // 나중에 실제 로그인 로직으로 교체 가능
    window.location.href = "/search";
  });

  switchBtn.addEventListener("click", function () {
    container.classList.toggle("s--signup");
  });

  if (signupBtn) {
    signupBtn.addEventListener("click", async function () {
      const payload = {
        email: signupEmail.value,
        password: signupPassword.value,
        name: signupName.value,
      };

      try {
        const response = await fetch(
          "http://3.36.128.91:8080/api/v1/user/register",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          }
        );

        if (response.ok) {
          alert("회원가입이 완료되었습니다. 로그인해주세요.");
          container.classList.remove("s--signup");
        } else {
          const text = await response.text();
          alert("회원가입 실패: " + text);
        }
      } catch (e) {
        alert("회원가입 중 오류가 발생했습니다.");
        console.error(e);
      }
    });
  }
});
