export const getIcon = (language: string) => {
  const icon = language.toLowerCase().replace(' ', '').replace('api', ''); // replace spaces and word api with empty string
  if (icon === 'express') {
    return 'https://cdn.simpleicons.org/express/white';
  }
  if (icon === 'socketio') {
    return 'https://cdn.simpleicons.org/socketio/white';
  }
  if (icon === 'openai') {
    return 'https://cdn.simpleicons.org/openai/white';
  }
  if (icon === 'ollama') {
    return 'https://cdn.simpleicons.org/ollama/white';
  }
  if (icon === 'whatsapp-web.js') {
    return 'https://cdn.simpleicons.org/whatsapp';
  }
  if (icon === 'mysql') {
    return 'https://cdn.simpleicons.org/mysql/white';
  }
  if (icon === 'postgresql') {
    return 'https://cdn.simpleicons.org/postgresql/white';
  }
  if (icon === 'sequelize') {
    return 'https://cdn.simpleicons.org/sequelize/white';
  }
  if (icon === 'quasar') {
    return 'https://cdn.simpleicons.org/quasar/white';
  }
  if (icon === 'electron') {
    return 'https://cdn.simpleicons.org/electron/white';
  }
  if (icon === 'vuex4') {
    return 'https://cdn.simpleicons.org/shopee/white';
  }
  if (icon === 'handlebars.js') {
    return 'https://cdn.simpleicons.org/handlebars.js/white';
  }
  return `https://cdn.simpleicons.org/${icon}`;
};