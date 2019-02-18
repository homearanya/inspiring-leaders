export const processMenu = (menuItems, currentPageSlug, viewPortWidth) => {
  // Activate active tree and transform menu for mobile
  let activeSubMenu = false;
  menuItems.forEach(menuItem => {
    let activeLink = menuItem.link && currentPageSlug === menuItem.link;
    // check for branches
    if (menuItem.subMenu && menuItem.subMenu.subMenuItems.length > 0) {
      let activeSubMenuItems = processMenu(
        menuItem.subMenu.subMenuItems,
        currentPageSlug,
        viewPortWidth
      );
      if (!activeLink && activeSubMenuItems) {
        activeLink = true;
      }
    }
    menuItem.active = activeLink;
    if (!activeSubMenu && activeLink) {
      activeSubMenu = activeLink;
    }
    // transform menu for mobile
    if (
      viewPortWidth < 992 &&
      menuItem.link &&
      menuItem.subMenu &&
      menuItem.subMenu.subMenuItems.length > 0
    ) {
      const newSubMenuItem = {
        name: menuItem.name,
        link: menuItem.link
      };
      menuItem.subMenu.subMenuItems.unshift(newSubMenuItem);
      menuItem.link = null;
    }
  });
  return activeSubMenu;
};
