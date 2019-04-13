/**
 * Unique id generator
 * @returns {string}
 */
function uniqueId() {
  return Math.round(Math.random() * Date.now()).toString(20).substr(0, 4);
}

/**
* Set attributes on giving element
* @param {object} attrs
* @param {HTMLElement} el
*/
function setAttrs(attrs, el) {
  Object.keys(attrs).forEach(key => el[key] = attrs[key]);
}

/**
* Naive sanitizer for patterns that match `on[event]=`. Replacing it with random value.
* @param {string} val
* @returns {string}
*/
function naiveSanitizer(val) {
  return val.replace(/(on\w+=)/gmi, `${uniqueId()}=`);
}

/**
* If the values is a string set it as text;
* @param {string} val
* @param {HTMLElement} el
* @returns {boolean}
*/
function ifStringSetText(val, el) {
  if (!!val && !!val.match) {
      el.innerHTML = naiveSanitizer(val);
      return true;
  }

  return false;
}

/**
* Create and element function for ease of use as api
* @param {string} tagName
* @returns {function}
*/
function createElement(tagName) {
  return function (attrs, children) {
      const el = document.createElement(tagName);
      attrs && setAttrs(attrs, el);
      if (children) {
          if (!!children.map) {
              children.forEach(child => {
                  if (!ifStringSetText(child, el)) {
                      el.appendChild(child);
                  }
              });
          }

          ifStringSetText(children, el);
      }
      return el;
  };
}

export const Button = createElement('button')
export const Form = createElement('form')
export const List = createElement('ul')
export const ListItem = createElement('li')
export const Input = createElement('input')
export const Link = createElement('a')
export const Div = createElement('div')
export const Script = createElement('script')