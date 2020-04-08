report({
  "testSuite": "BackstopJS",
  "tests": [
    {
      "pair": {
        "reference": "../../../backstop_data/bitmaps_reference/backstop_default_UI__0_document_0_phone.png",
        "test": "../../../backstop_data/bitmaps_test/20200407-183859/backstop_default_UI__0_document_0_phone.png",
        "selector": "document",
        "fileName": "backstop_default_UI__0_document_0_phone.png",
        "label": "UI 测试",
        "requireSameDimensions": true,
        "misMatchThreshold": 0.1,
        "url": "https://map.qq.com/m/index/index",
        "referenceUrl": "",
        "expect": 0,
        "viewportLabel": "phone",
        "diff": {
          "isSameDimensions": true,
          "dimensionDifference": {
            "width": 0,
            "height": 0
          },
          "misMatchPercentage": "0.00"
        }
      },
      "status": "pass"
    },
    {
      "pair": {
        "reference": "../../../backstop_data/bitmaps_reference/backstop_default_UI__0_document_1_tablet.png",
        "test": "../../../backstop_data/bitmaps_test/20200407-183859/backstop_default_UI__0_document_1_tablet.png",
        "selector": "document",
        "fileName": "backstop_default_UI__0_document_1_tablet.png",
        "label": "UI 测试",
        "requireSameDimensions": true,
        "misMatchThreshold": 0.1,
        "url": "https://map.qq.com/m/index/index",
        "referenceUrl": "",
        "expect": 0,
        "viewportLabel": "tablet",
        "diff": {
          "isSameDimensions": true,
          "dimensionDifference": {
            "width": 0,
            "height": 0
          },
          "misMatchPercentage": "0.00"
        }
      },
      "status": "pass"
    }
  ],
  "id": "backstop_default"
});