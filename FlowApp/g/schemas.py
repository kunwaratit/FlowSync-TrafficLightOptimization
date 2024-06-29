{
  "type": "object",
  "properties": {
    "email": {
      "type": "string",
      "format": "email"
    },
    "password": {
      "type": "string",
      "minLength": 6
    },
    "password2": {
      "type": "string"
    },
    "phone_number": {
      "type": "string",
      "maxLength": 15
    },
    "district": {
      "type": "string",
      "maxLength": 20
    },
    "intersection": {
      "type": "string",
      "maxLength": 20
    },
    "is_active": {
      "type": "boolean",
      "default": true
    },
    "is_admin": {
      "type": "boolean",
      "default": false
    },
    "tc": {
      "type": "boolean"
    },
    "created_at": {
      "type": "string",
      "format": "date-time"
    },
    "updated_at": {
      "type": "string",
      "format": "date-time"
    }
  },
  "required": ["email", "password", "password2", "phone_number", "district", "intersection", "tc"]
}
