import * as elementFactory from '../utils/element-factory.js';

export function renderPotion(potion) {
  const potionElement = elementFactory.createElement('div', 'item');
  const displayContainer = elementFactory.createAndAppendElement('div', 'item-display', potionElement);

  // For displaying a potion's ingredients
  const underneathContainer = elementFactory.createAndAppendElement('div', 'item-underneath-container', potionElement);

  // Potion image
  const image = elementFactory.createAndAppendElement('img', 'item-icon', displayContainer);
  image.src = '../icons/test-icon.png';

  // Potion info, including name, type, effect, etc.
  const infoContainer = elementFactory.createAndAppendElement('div', 'item-info', displayContainer);

  // Potion name, type, and cost
  const infoHeader = elementFactory.createAndAppendElement('p', 'item-info-header', infoContainer);
  const potionName = elementFactory.createAndAppendElement('p', ['potion-name', 'font-jersey'], infoHeader);
  potionName.textContent = potion.name;
  const potionType = elementFactory.createAndAppendElement('p', ['potion-type', 'font-jersey'], infoHeader);
  potionType.textContent = potion.type;
  const infoPriceContainer = elementFactory.createAndAppendElement('div', 'potion-price-container', infoHeader);
  const infoPriceIcon = elementFactory.createAndAppendElement('img', 'potion-price-icon', infoPriceContainer);
  infoPriceIcon.src = '../icons/coin-icon.png';
  const potionPrice = elementFactory.createAndAppendElement('p', ['potion-price', 'font-jersey'], infoPriceContainer);
  potionPrice.textContent = potion.price;

  // Potion effect
  const infoBody = elementFactory.createAndAppendElement('div', 'item-info-body', infoContainer);
  const potionEffect = elementFactory.createAndAppendElement('p', ['potion-effect', 'font-jersey'], infoBody);
  potionEffect.textContent = potion.effect;

  return potionElement;
}