module.exports = {
  attributes: {

    user_id: {
      type: 'integer',
      required: true,
      autoincrement: true,
      primaryKey: true
    },

    username: {
      type: 'string',
      required: true,
      unique: true
    },

    password: {
      type: 'string',
      required: true
    },

    name: {
      type: 'string',
      required: true
    },

    last_name: {
      type: 'string',
      required: true
    },

    logged_in: {
      type: 'boolean',
      required: true
    },

    social_network: {
      type: 'string',
    },

    email: {
      type: 'string',
    }
  }

}