```javascript
{
    "$schema": "http://json-schema.org/draft-07/schema",
    "$id": "http://example.com/example.json",
    "type": "object",
    "title": "The root schema",
    "description": "The root schema comprises the entire JSON document.",
    "default": {},
    "examples": [
        {
            "@timestamp": "2020-05-11T09:10:35.266Z",
            "message": "the text",
            "stream": "stderr",
            "loglevel": "INFO",
            "host": {
                "name": "container_origin"
            },
            "@version": "1",
            "tags": [
                "beats_input_codec_plain_applied"
            ]
        }
    ],
    "required": [
        "tags",
        "host",
        "message",
        "@version",
        "@timestamp",
        "stream",
        "loglevel"
    ],
    "additionalProperties": true,
    "properties": {
        "tags": {
            "$id": "#/properties/tags",
            "type": "array",
            "title": "The tags schema",
            "description": "An explanation about the purpose of this instance.",
            "default": [],
            "examples": [
                [
                    "beats_input_codec_plain_applied"
                ]
            ],
            "additionalItems": true,
            "items": {
                "anyOf": [
                    {
                        "$id": "#/properties/tags/items/anyOf/0",
                        "type": "string",
                        "title": "The first anyOf schema",
                        "description": "An explanation about the purpose of this instance.",
                        "default": "",
                        "examples": [
                            "beats_input_codec_plain_applied"
                        ]
                    }
                ],
                "$id": "#/properties/tags/items"
            }
        },
        "host": {
            "$id": "#/properties/host",
            "type": "object",
            "title": "The host schema",
            "description": "An explanation about the purpose of this instance.",
            "default": {},
            "examples": [
                {
                    "name": "container_origin"
                }
            ],
            "required": [
                "name"
            ],
            "additionalProperties": true,
            "properties": {
                "name": {
                    "$id": "#/properties/host/properties/name",
                    "type": "string",
                    "title": "The name schema",
                    "description": "An explanation about the purpose of this instance.",
                    "default": "",
                    "examples": [
                        "container_origin"
                    ]
                }
            }
        },
        "message": {
            "$id": "#/properties/message",
            "type": "string",
            "title": "The message schema",
            "description": "An explanation about the purpose of this instance.",
            "default": "",
            "examples": [
                "the text"
            ]
        },
        "@version": {
            "$id": "#/properties/@version",
            "type": "string",
            "title": "The @version schema",
            "description": "An explanation about the purpose of this instance.",
            "default": "",
            "examples": [
                "1"
            ]
        },
        "@timestamp": {
            "$id": "#/properties/@timestamp",
            "type": "string",
            "title": "The @timestamp schema",
            "description": "An explanation about the purpose of this instance.",
            "default": "",
            "examples": [
                "2020-05-11T09:10:35.266Z"
            ]
        },
        "stream": {
            "$id": "#/properties/stream",
            "type": "string",
            "title": "The stream schema",
            "description": "An explanation about the purpose of this instance.",
            "default": "",
            "examples": [
                "stderr"
            ]
        },
        "loglevel": {
            "$id": "#/properties/loglevel",
            "type": "string",
            "title": "The loglevel schema",
            "description": "An explanation about the purpose of this instance.",
            "default": "",
            "examples": [
                "INFO"
            ]
        }
    }
}
```
