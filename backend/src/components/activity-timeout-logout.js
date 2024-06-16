document.addEventListener("DOMContentLoaded", function () {
  // 로그인 상태를 알기 위해 localStorage에서 accessToken 추출
  const accessToken = localStorage.getItem("accessToken");

  // 로그인 상태라면 타이머 실행.
  if (accessToken) {
    // 30분
    const timeoutTime = 1800000;
    var timeout;
    function resetTimer() {
      clearTimeout(timeout);
      timeout = setTimeout(checkToken, timeoutTime);

      // 토큰 검증
      function checkToken() {
        fetch("/token", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.error) {
              console.error("서버 에러:", data.error);
              throw new Error(data.message);
            }
            // 타이머가 다시 실행되도록 페이지 새로고침
            window.location.reload();
          })
          .catch((error) => {
            console.error("Catch block error:", error);
            localStorage.clear();
            alert(`다시 로그인 해주시길 바랍니다. ${error.message}`);
            window.location.href = "/"; // 에러 발생 시 로그인 페이지로 리다이렉트
          });
      }
    }

    // 리스너를 설정할 이벤트 목록
    var events = [
      "load",
      "mousemove",
      "mousedown",
      "touchstart",
      "click",
      "keypress",
      "scroll",
    ];

    // 모든 이벤트에 대해 리스너 설정
    events.forEach(function (event) {
      window.addEventListener(event, resetTimer, true);
    });
  }
});
