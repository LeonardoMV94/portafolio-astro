export const getIcon = (language: string) => {
  const icon = language.toLowerCase().replace(' ', '').replace('api', ''); // replace spaces and word api with empty string
  const colorIcon = "/white"
  
  if (icon === 'express') {
    return `https://cdn.simpleicons.org/express${colorIcon}`;
  }
  if (icon === 'socketio') {
    return `https://cdn.simpleicons.org/socketio${colorIcon}`;
  }
  if (icon === 'openai') {
    return `https://cdn.simpleicons.org/openai${colorIcon}`;
  }
  if (icon === 'ollama') {
    return `https://cdn.simpleicons.org/ollama${colorIcon}`;
  }
  if (icon === 'whatsapp-web.js') {
    return `https://cdn.simpleicons.org/whatsapp${colorIcon}`;
  }
  if (icon === 'mysql') {
    return `https://cdn.simpleicons.org/mysql${colorIcon}`;
  }
  if (icon === 'postgresql') {
    return `https://cdn.simpleicons.org/postgresql${colorIcon}`;
  }
  if (icon === 'sequelize') {
    return `https://cdn.simpleicons.org/sequelize${colorIcon}`;
  }
  if (icon === 'quasar') {
    return `https://cdn.simpleicons.org/quasar${colorIcon}`;
  }
  if (icon === 'electron') {
    return `https://cdn.simpleicons.org/electron${colorIcon}`;
  }
  if (icon === 'vuex4') {
    return `https://cdn.simpleicons.org/shopee${colorIcon}`;
  }
  if (icon === 'n8n') {
    return `https://cdn.simpleicons.org/n8n${colorIcon}`
  }
  if (icon === 'nx') {
    return `https://cdn.simpleicons.org/nx${colorIcon}`
  }
  if (icon === 'handlebars.js') {
    return `https://cdn.simpleicons.org/handlebars.js${colorIcon}`;
  }
  return `https://cdn.simpleicons.org/${icon}`;
};