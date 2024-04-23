/**
 * Preload fonts
 * @param {String} id
 */
export const preloadFonts = id => {
  return new Promise((resolve) => {
      WebFont.load({
          typekit: {
              id: id
          },
          active: resolve
      });
  });
};