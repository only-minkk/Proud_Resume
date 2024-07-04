document.addEventListener("DOMContentLoaded", () => {
  // const resumeLoad = async (resumeId) => {
  //   try {
  //     // const response = await fetch(
  //     //   `resumes/${localStorage.userId}/${resumeId}`,
  //     //   {
  //     //     method: "GET",
  //     //     headers: {
  //     //       Authorization: `Bearer ${localStorage.accessToken}`,
  //     //     },
  //     //   }
  //     // );
  //     // if (!response.ok) {
  //     //   const error = await response.json();
  //     //   throw error;
  //     // }
  //     // const responseData = await response.json();
  //     // const resumeDetailPage = window.open("/resumeDetail", "_blank");
  //     // // 페이지가 로드된 후 데이터를 전달
  //     // resumeDetailPage.onload = () => {
  //     //   resumeDetailPage.postMessage(responseData, window.location.origin);
  //     // };
  //     // console.log(responseData);
  //     // const resumeDetailPage = window.open(
  //     //   "/resumeDetail",
  //     //   "_blank",
  //     //   "width=600,height=400"
  //     // );
  //     // resumeDetailPage.document.write(responseData);
  //     // resumeDetailPage.close();
  //     // const data = await response.json();
  //     // console.log(data);
  //   } catch (error) {
  //     alert(error.message);
  //     window.location.href = "/users";
  //   }
  // };

  // 이력서 목록 (이력서 목록 섹션 클릭)
  document.getElementById("getResumes").addEventListener("click", async () => {
    try {
      // 이미 생성된 이력서 목록(섹션)이 있는지 확인
      const resumeContents = document.querySelectorAll("#resumeContents");

      // 이미 생성된 섹션이 있다면 display 속성을 토글(숨기기/보이기)
      if (resumeContents.length > 0) {
        resumeContents.forEach((element) => {
          const displayStyle = window.getComputedStyle(element).display;
          element.style.display = displayStyle === "block" ? "none" : "block";
        });
        return;
      }

      // 섹션이 없다면 서버에 요청
      const response = await fetch(`resumes/${localStorage.userId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.accessToken}`,
        },
      });

      // 응답이 성공적이지 않다면 응답받은 json을 에러 처리
      if (!response.ok) {
        const error = await response.json();
        throw error;
      }

      // 응답받은 json 데이터 파싱
      const data = await response.json();

      // 응답받은 데이터를 순회하며 새로운 섹션 생성, 삽입
      data.forEach((resume) => {
        const resumeWindow = document.createElement("section");
        resumeWindow.className = "contents";
        resumeWindow.id = "resumeContents";
        resumeWindow.innerHTML = `
            <a id="resumeTitle">${resume.title}</a>
            <a id="resumeId" style="display:none;">${resume._id}</a>
          `;
        document
          .getElementById("getResumes")
          .insertAdjacentElement("afterend", resumeWindow);
        resumeWindow.addEventListener("click", (event) => {
          window.location.href = `/resumes/${localStorage.userId}/${
            event.target.querySelector("#resumeId").textContent
          }`;
          // resumeLoad(event.target.querySelector("#resumeId").textContent);
        });
      });
    } catch (error) {
      alert(error.message);
      window.location.href = "/users";
    }
  });
});
