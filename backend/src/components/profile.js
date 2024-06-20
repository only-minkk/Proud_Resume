// document.addEventListener("click", function (event) {
//   // 이벤트 타겟이 취소 버튼인지 확인
//   if (
//     event.target.matches('button[type="button"]') &&
//     event.target.textContent === "취소"
//   ) {
//     cancelButton(event);
//     // } else if (
//     //   event.target.matches('button[type="button"]') &&
//     //   event.target.textContent === "수정"
//     // ) {
//     //   console.log("111Event target:", event.target);
//     //   console.log("111Event currentTarget:", event.currentTarget);
//     //   // createUpdateForm(event);
//   }
// });

// 개인정보 수정 (개인정보 수정 버튼 클릭)
function updateProfile(event) {
  event.preventDefault();

  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  if (password != confirmPassword) {
    alert("새롭게 입력하신 비밀번호를 다시 확인해 주세요.");
    return;
  }

  const form = document.querySelector("#updateForm");

  const formData = new FormData(form);

  const formDataObject = {};

  for (const [key, value] of formData.entries()) {
    formDataObject[key] = value;
  }

  delete formDataObject.confirmPassword;

  fetch(`/users/${localStorage.userId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.accessToken}`,
    },
    body: JSON.stringify(formDataObject),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        alert(`${data.message}`);
      } else {
        throw new Error(data.message);
      }
      return (window.location.href = "/users");
    })
    .catch((error) => {
      alert(`Error : ${error.message}`);
    });
}

// 개인정보 수정 섹션 생성
function createUpdateForm(event) {
  event.preventDefault();

  //querySelectorAll은 NodeList를 반환하므로 forEach 메서드를 사용하여 각 버튼에 접근해야한다.
  // event.target.parentNode.querySelectorAll("button").style.display = "none";

  const buttons =
    event.target.parentNode.parentNode.querySelector("#buttonDiv");

  if (buttons) {
    buttons.style.display = "none";
  }

  // buttons.forEach((button) => [(button.style.display = "none")]);

  const userInfo = document.getElementById("getUsersContents");
  const userEmail = userInfo
    .querySelector("#userEmail")
    .textContent.split(": ")[1];
  const userName = userInfo
    .querySelector("#userName")
    .textContent.split(": ")[1];

  const toUpdateSection = document.createElement("section");
  toUpdateSection.className = "contents";
  toUpdateSection.id = "toUpdateSection";
  toUpdateSection.innerHTML = `
      <form id="updateForm">
        <label for="email">이메일: ${userEmail}</label>

        <label for="name">이름</label>
        <input type="text" id="name" name="name" value="${userName}" autocomplete="name"/>
        <div id="nameError" class="error-message"></div>


        <label for="currentPassword">현재 비밀번호</label>
        <input type="password" id="currentPassword" name="currentPassword" autocomplete="current-password"/>
        <div id="currentPasswordError" class="error-message">비밀번호를 입력해 주세요.</div>

        <label for="password">새 비밀번호</label>
        <input type="password" id="password" name="password" autocomplete="new-password"/>
        <div id="passwordError" class="error-message">비밀번호를 입력해 주세요.</div>

        <label for="confirmPassword">새 비밀번호 확인</label>
        <input type="password" id="confirmPassword" name="confirmPassword" autocomplete="new-password"/>
        <div id="confirmPasswordError" class="error-message">비밀번호를 입력해 주세요.</div>

        <div id="buttonDiv">
          <button id="submitButton" type="submit" onclick="updateProfile(event)" style="display:none;">제출</button>
          <button type="button" onclick="cancelButton(event)">취소</button>
        </div>
      </form>`;
  document
    .getElementById("getUsersContents")
    .insertAdjacentElement("afterend", toUpdateSection);

  const nameInput = document.getElementById("name");
  const currentPasswordInput = document.getElementById("currentPassword");
  const passwordInput = document.getElementById("password");
  const confirmPasswordInput = document.getElementById("confirmPassword");
  const updateFormInput = document.getElementById("updateForm");
  const submitButton = document.getElementById("submitButton");
  nameInput.addEventListener("input", function () {
    if (!nameInput.value) {
      nameError.textContent = "이름을 입력해 주세요.";
    } else {
      nameError.textContent = "";
    }
  });

  currentPasswordInput.addEventListener("input", function () {
    if (!currentPasswordInput.value) {
      currentPasswordError.textContent = "비밀번호를 입력해 주세요.";
    } else {
      currentPasswordError.textContent = "";
    }
  });

  passwordInput.addEventListener("input", function () {
    if (!passwordInput.value) {
      passwordError.textContent = "비밀번호를 입력해 주세요.";
    } else {
      passwordError.textContent = "";
    }
  });

  // 새롭게 입력한 비밀번호 검증용 입력 이벤트 리스너를 추가
  confirmPasswordInput.addEventListener("input", function () {
    // 비밀번호와 비밀번호 확인이 일치하는지 검사
    if (!confirmPasswordInput.value) {
      confirmPasswordError.textContent = "비밀번호를 입력해 주세요.";
    } else if (passwordInput.value !== confirmPasswordInput.value) {
      // 일치하지 않으면 사용자에게 경고를 표시
      confirmPasswordError.textContent = "비밀번호가 일치하지 않습니다.";
    } else {
      // 문제가 없으면 경고를 제거
      confirmPasswordError.textContent = "";
    }
  });

  updateFormInput.addEventListener("input", function () {
    if (
      [
        nameError.textContent,
        currentPasswordError.textContent,
        passwordError.textContent,
        confirmPasswordError.textContent,
      ].every((value) => value === "")
    ) {
      submitButton.style.display = "inline";
    } else {
      submitButton.style.display = "none";
    }
  });
}

// 취소 버튼 함수
function cancelButton(event) {
  event.preventDefault();
  const thisSection = event.target.closest("section");
  const siblingSectionButtons =
    thisSection.previousElementSibling?.querySelector("#buttonDiv");

  if (siblingSectionButtons) {
    siblingSectionButtons.style.display = "block";
  }

  if (thisSection) {
    thisSection.remove();
  }
}

document.addEventListener("DOMContentLoaded", function () {
  // 로컬스토리지에서 accessToken과 userId 추출
  const userId = localStorage.getItem("userId");
  const accessToken = localStorage.getItem("accessToken");

  // 로컬스토리지에 값이 없다면 로그인을 안한 상태이거나 로그인 과정에서 오류가 있는 것.
  if (!userId || !accessToken) {
    alert(
      "로그인이 안되었거나 로그인 과정에서 오류가 발생하였습니다. 다시 로그인 해주세요."
    );
    localStorage.clear();
    window.location = "/";
  }

  // 로그아웃
  const logoutButton = document.getElementById("logout");
  // 로그아웃 이벤트리스너
  logoutButton.addEventListener("click", function (event) {
    event.preventDefault(); // 기본 이벤트 방지.
    localStorage.clear(); // 로컬 스토리지의 모든 데이터를 삭제
    alert("로그아웃하였습니다.");

    // fetch("/logout", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // });

    window.location = "/";
    return;
  });

  // 개인정보 보기 (개인정보 섹션 클릭)
  document.getElementById("getUsers").addEventListener("click", function () {
    // 개인정보를 보여줄 섹션
    const getUsersContents = document.getElementById("getUsersContents");

    // 개인정보 수정 섹션
    const toUpdateSection = document.getElementById("toUpdateSection");

    // 이미 조회된 개인정보가 있다면
    if (getUsersContents) {
      // 개인정보 섹션의 보이기/숨기기 토글
      if (window.getComputedStyle(getUsersContents).display === "block") {
        getUsersContents.style.display = "none";
        // 수정 섹션도 함께 숨김
        if (toUpdateSection) {
          toUpdateSection.style.display = "none";
        }
      } else {
        // 개인정보 섹션을 보이게 함
        getUsersContents.style.display = "block";
        // 수정 섹션도 함께 보이게 함
        if (toUpdateSection) {
          toUpdateSection.style.display = "block";
        }
        return;
      }
    } else {
      // 호출한 개인정보가 없다면 개인정보를 서버에 요청.
      fetch(`users/${userId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          // 조회한 유저의 정보를 응답 받았다면.
          if (data[0]?.name && data[0]?.email) {
            // 섹션 요소 생성
            const userInfo = document.createElement("section");
            // 섹션의 클래스명, 아이디, html 생성
            userInfo.className = "contents";
            userInfo.id = "getUsersContents";
            userInfo.innerHTML = `
                    <p id="userEmail">이메일: ${data[0].email}</p>
                    <p id="userName">이름: ${data[0].name}</p>
                    <div id="buttonDiv">
                      <button id ="updateButton" type="button" onclick="createUpdateForm(event)">수정</button>
                      <button type="button" onclick="cancelButton(event)">취소</button>
                    <div>
                `;
            // 개인정보를 개인정보 섹션 하위 요소로 부여.
            document
              .getElementById("getUsers")
              .insertAdjacentElement("afterend", userInfo);
          } else {
            if (data.error) {
              throw new Error(data.message);
            }
            alert("개인 정보를 불러오는 데 실패하였습니다.");
          }
        })
        .catch((error) => {
          console.error("Error : ", error);
          alert(`Error : ${error.message}`);
        });
    }
  });
});
