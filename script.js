(function () {
  const card = document.getElementById("card");
  const toast = document.getElementById("toast");
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /** 카드에 살짝 기울기(마우스) */
  if (card && !prefersReduced) {
    const maxTilt = 6;

    card.addEventListener("mousemove", function (e) {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      const rotY = x * maxTilt * 2;
      const rotX = -y * maxTilt * 2;
      card.style.transform =
        "perspective(1200px) rotateX(" + rotX + "deg) rotateY(" + rotY + "deg)";
    });

    card.addEventListener("mouseleave", function () {
      card.style.transform = "";
    });
  }

  /** 연락처 클릭 시 클립보드 복사 + 토스트 */
  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("is-visible");
    clearTimeout(showToast._t);
    showToast._t = setTimeout(function () {
      toast.classList.remove("is-visible");
    }, 2000);
  }

  document.querySelectorAll(".contact-link[data-copy]").forEach(function (link) {
    link.addEventListener("dblclick", function (e) {
      e.preventDefault();
      const text = link.getAttribute("data-copy");
      if (!text || !navigator.clipboard) return;
      navigator.clipboard.writeText(text).then(function () {
        showToast("복사했습니다: " + text);
      });
    });
  });
})();
