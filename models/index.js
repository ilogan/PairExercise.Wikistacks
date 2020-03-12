const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/wikistack',{
logging: false
})

const Page = db.define('page', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  slug: {
    type: Sequelize.STRING,
    allowNull: false

  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false

  },
  status: {
    type: Sequelize.ENUM('open', 'closed'),
    validate: {
   defaultValue: 'open'
    }
  }
})

const User = db.define('user', {
  name: {
    type: Sequelize.STRING,
    allowNull: false

  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
  }
})

let slugify = (title) => {
return title.replace(/\s+/g, '_').replace(/\W/g, '')
}

Page.beforeValidate(instance => {
  const slug = slugify(instance.title)
  instance.slug = slug
  return instance
})

module.exports = {
  db,
  Page,
  User
}
