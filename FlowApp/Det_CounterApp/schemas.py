# schemas.py

detection_schema = {
    "type": "object",
    "properties": {
        "_id": {"type": "string"},
        "location_id": {"type": "string"},
        "positions": {
            "type": "object",
            "properties": {
                "x": {
                    "type": "object",
                    "properties": {
                       
                        "vehicles": {
                            "type": "object",
                            "properties": {
                                "cars": {"type": "integer"},
                                "bikes": {"type": "integer"},
                               
                            },
                            "required": ["cars", "bikes",]
                        }
                    },
                    "required": ["vehicles"]
                },
                "y": {
                    "type": "object",
                    "properties": {
                      
                        "vehicles": {
                            "type": "object",
                            "properties": {
                                "cars": {"type": "integer"},
                                "bikes": {"type": "integer"},
                             
                            },
                            "required": ["cars", "bikes"]
                        }
                    },
                    "required": ["vehicles"]
                },
                "z": {
                    "type": "object",
                    "properties": {
                      
                        "vehicles": {
                            "type": "object",
                            "properties": {
                                "cars": {"type": "integer"},
                                "bikes": {"type": "integer"},
                           
                            },
                            "required": ["cars", "bikes"]
                        }
                    },
                    "required": [ "vehicles"]
                }
            },
            "required": ["x", "y", "z"]
        }
    },
    "required": ["location_id", "positions"]
}
