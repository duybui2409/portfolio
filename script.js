const menuButton = document.querySelector(".menu-button");
const navigation = document.querySelector(".main-nav");
const navigationLinks = document.querySelectorAll('.main-nav a[href^="#"]');
const sections = document.querySelectorAll("main section[id]");
const year = document.querySelector("#current-year");

if (year) {
  year.textContent = new Date().getFullYear();
}

if (menuButton && navigation) {
  menuButton.addEventListener("click", () => {
    const isOpen = navigation.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.setAttribute("aria-label", isOpen ? "Đóng trình đơn" : "Mở trình đơn");
  });

  navigationLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navigation.classList.remove("open");
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "Mở trình đơn");
    });
  });
}

if ("IntersectionObserver" in window && sections.length > 0) {
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      const visibleSection = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (!visibleSection) {
        return;
      }

      navigationLinks.forEach((link) => {
        const activeSection =
          visibleSection.target.id === "trang-chu"
            ? "#gioi-thieu"
            : `#${visibleSection.target.id}`;
        link.classList.toggle("active", link.getAttribute("href") === activeSection);
      });
    },
    {
      rootMargin: "-25% 0px -60%",
      threshold: [0.05, 0.25, 0.5],
    },
  );

  sections.forEach((section) => sectionObserver.observe(section));
}
