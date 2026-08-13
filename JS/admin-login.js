document.getElementById("adminLoginForm").addEventListener("submit", (e) => {
      e.preventDefault();
      const fd = new FormData(e.target);
      const r = window.Auth.adminLogin(fd.get("email"), fd.get("password"));
      if (!r.ok) { alert(r.error); return; }
      location.href = "/admin.html";
    });