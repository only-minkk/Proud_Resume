function resumeDetail() {
  console.log("ddd");
}

document.addEventListener("DOMContentLoaded", function (event) {
  // 이력서 목록 (이력서 목록 섹션 클릭)
  document.getElementById("getResumes").addEventListener("click", function () {
    const resumeContents = document.getElementById("resumeContents");

    if (resumeContents?.style.display === "block") {
      const resumeContents = document.querySelectorAll("#resumeContents");
      resumeContents.forEach((i) => {
        i.style.display = "none";
      });
      return;
    } else if (resumeContents?.style.display === "none") {
      const resumeContents = document.querySelectorAll("#resumeContents");
      resumeContents.forEach((i) => {
        i.style.display = "block";
      });
      return;
    } else {
      fetch(`resumes/${localStorage.userId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.accessToken}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          // 이력서 섹션 생성? 아니면 이력서 제목들만 목록 나열하고 클릭하면 이력서 edit 창이나 이력서 화면으로 넘길까?

          data.map((resume) => {
            const resumeWindow = document.createElement("section");
            // resumeWindow.onclick = resumeDetail();
            resumeWindow.className = "contents";
            resumeWindow.id = "resumeContents";
            resumeWindow.innerHTML = `
              <a>${resume.title}</a>
            `;
            resumeWindow.style.display = "block";
            document
              .getElementById("getResumes")
              .insertAdjacentElement("afterend", resumeWindow);
          });
        })
        .catch((error) => {
          console.error("Error : ", error);
          alert(`Error : ${error.message}`);
        });
    }
  });
});
