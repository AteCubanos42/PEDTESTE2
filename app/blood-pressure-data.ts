export type BloodPressureSex = "masculino" | "feminino";

export type BloodPressurePercentile = {
  systolic: number;
  diastolic: number;
  mean: number;
};

export type BloodPressurePercentiles = {
  P5: BloodPressurePercentile;
  P10: BloodPressurePercentile;
  P50: BloodPressurePercentile;
  P90: BloodPressurePercentile;
  P95: BloodPressurePercentile;
};

export type BloodPressureReference = {
  id: string;
  label: string;
  ageDays: number;
  ageYears: number | null;
  fcLow: number | null;
  fcHigh: number | null;
  frHigh: number | null;
  percentiles: BloodPressurePercentiles;
};

export const INFANT_BLOOD_PRESSURE_REFERENCES: BloodPressureReference[] = [
  {
    "id": "1dia",
    "label": "1 dia",
    "ageDays": 1,
    "ageYears": null,
    "fcLow": 90,
    "fcHigh": 180,
    "frHigh": 34,
    "percentiles": {
      "P5": {
        "systolic": 46,
        "diastolic": 38,
        "mean": 40.7
      },
      "P10": {
        "systolic": 50,
        "diastolic": 42,
        "mean": 44.7
      },
      "P50": {
        "systolic": 65,
        "diastolic": 55,
        "mean": 58.3
      },
      "P90": {
        "systolic": 80,
        "diastolic": 68,
        "mean": 72
      },
      "P95": {
        "systolic": 84,
        "diastolic": 72,
        "mean": 76
      }
    }
  },
  {
    "id": "3dias",
    "label": "3 dias",
    "ageDays": 3,
    "ageYears": null,
    "fcLow": 90,
    "fcHigh": 180,
    "frHigh": 34,
    "percentiles": {
      "P5": {
        "systolic": 53,
        "diastolic": 38,
        "mean": 43
      },
      "P10": {
        "systolic": 57,
        "diastolic": 42,
        "mean": 47
      },
      "P50": {
        "systolic": 72,
        "diastolic": 55,
        "mean": 60.7
      },
      "P90": {
        "systolic": 86,
        "diastolic": 68,
        "mean": 74
      },
      "P95": {
        "systolic": 90,
        "diastolic": 71,
        "mean": 77.3
      }
    }
  },
  {
    "id": "7dias",
    "label": "7 dias",
    "ageDays": 7,
    "ageYears": null,
    "fcLow": 90,
    "fcHigh": 180,
    "frHigh": 34,
    "percentiles": {
      "P5": {
        "systolic": 60,
        "diastolic": 38,
        "mean": 45.3
      },
      "P10": {
        "systolic": 64,
        "diastolic": 41,
        "mean": 48.7
      },
      "P50": {
        "systolic": 78,
        "diastolic": 54,
        "mean": 62
      },
      "P90": {
        "systolic": 93,
        "diastolic": 67,
        "mean": 75.7
      },
      "P95": {
        "systolic": 97,
        "diastolic": 71,
        "mean": 79.7
      }
    }
  },
  {
    "id": "1mes",
    "label": "1 mês",
    "ageDays": 30.4375,
    "ageYears": null,
    "fcLow": 90,
    "fcHigh": 180,
    "frHigh": 34,
    "percentiles": {
      "P5": {
        "systolic": 67,
        "diastolic": 35,
        "mean": 45.7
      },
      "P10": {
        "systolic": 71,
        "diastolic": 39,
        "mean": 49.7
      },
      "P50": {
        "systolic": 86,
        "diastolic": 52,
        "mean": 63.3
      },
      "P90": {
        "systolic": 101,
        "diastolic": 64,
        "mean": 76.3
      },
      "P95": {
        "systolic": 105,
        "diastolic": 68,
        "mean": 80.3
      }
    }
  },
  {
    "id": "2meses",
    "label": "2 meses",
    "ageDays": 60.875,
    "ageYears": null,
    "fcLow": 90,
    "fcHigh": 180,
    "frHigh": 34,
    "percentiles": {
      "P5": {
        "systolic": 68,
        "diastolic": 34,
        "mean": 45.3
      },
      "P10": {
        "systolic": 72,
        "diastolic": 38,
        "mean": 49.3
      },
      "P50": {
        "systolic": 87,
        "diastolic": 51,
        "mean": 63
      },
      "P90": {
        "systolic": 101,
        "diastolic": 64,
        "mean": 76.3
      },
      "P95": {
        "systolic": 106,
        "diastolic": 68,
        "mean": 80.7
      }
    }
  },
  {
    "id": "3meses",
    "label": "3 meses",
    "ageDays": 91.3125,
    "ageYears": null,
    "fcLow": 90,
    "fcHigh": 180,
    "frHigh": 34,
    "percentiles": {
      "P5": {
        "systolic": 70,
        "diastolic": 35,
        "mean": 46.7
      },
      "P10": {
        "systolic": 74,
        "diastolic": 38,
        "mean": 50
      },
      "P50": {
        "systolic": 89,
        "diastolic": 51,
        "mean": 63.7
      },
      "P90": {
        "systolic": 104,
        "diastolic": 64,
        "mean": 77.3
      },
      "P95": {
        "systolic": 108,
        "diastolic": 68,
        "mean": 81.3
      }
    }
  },
  {
    "id": "4meses",
    "label": "4 meses",
    "ageDays": 121.75,
    "ageYears": null,
    "fcLow": 90,
    "fcHigh": 180,
    "frHigh": 34,
    "percentiles": {
      "P5": {
        "systolic": 71,
        "diastolic": 35,
        "mean": 47
      },
      "P10": {
        "systolic": 75,
        "diastolic": 39,
        "mean": 51
      },
      "P50": {
        "systolic": 90,
        "diastolic": 52,
        "mean": 64.7
      },
      "P90": {
        "systolic": 105,
        "diastolic": 65,
        "mean": 78.3
      },
      "P95": {
        "systolic": 109,
        "diastolic": 68,
        "mean": 81.7
      }
    }
  },
  {
    "id": "5meses",
    "label": "5 meses",
    "ageDays": 152.1875,
    "ageYears": null,
    "fcLow": 90,
    "fcHigh": 180,
    "frHigh": 34,
    "percentiles": {
      "P5": {
        "systolic": 72,
        "diastolic": 36,
        "mean": 48
      },
      "P10": {
        "systolic": 76,
        "diastolic": 39,
        "mean": 51.3
      },
      "P50": {
        "systolic": 91,
        "diastolic": 53,
        "mean": 65.7
      },
      "P90": {
        "systolic": 106,
        "diastolic": 65,
        "mean": 78.7
      },
      "P95": {
        "systolic": 110,
        "diastolic": 69,
        "mean": 82.7
      }
    }
  },
  {
    "id": "6meses",
    "label": "6 meses",
    "ageDays": 182.625,
    "ageYears": null,
    "fcLow": 90,
    "fcHigh": 180,
    "frHigh": 34,
    "percentiles": {
      "P5": {
        "systolic": 72,
        "diastolic": 36,
        "mean": 48
      },
      "P10": {
        "systolic": 76,
        "diastolic": 40,
        "mean": 52
      },
      "P50": {
        "systolic": 91,
        "diastolic": 53,
        "mean": 65.7
      },
      "P90": {
        "systolic": 106,
        "diastolic": 66,
        "mean": 79.3
      },
      "P95": {
        "systolic": 110,
        "diastolic": 69,
        "mean": 82.7
      }
    }
  },
  {
    "id": "7meses",
    "label": "7 meses",
    "ageDays": 213.0625,
    "ageYears": null,
    "fcLow": 90,
    "fcHigh": 180,
    "frHigh": 34,
    "percentiles": {
      "P5": {
        "systolic": 72,
        "diastolic": 36,
        "mean": 48
      },
      "P10": {
        "systolic": 76,
        "diastolic": 40,
        "mean": 52
      },
      "P50": {
        "systolic": 91,
        "diastolic": 53,
        "mean": 65.7
      },
      "P90": {
        "systolic": 106,
        "diastolic": 66,
        "mean": 79.3
      },
      "P95": {
        "systolic": 110,
        "diastolic": 70,
        "mean": 83.3
      }
    }
  },
  {
    "id": "8meses",
    "label": "8 meses",
    "ageDays": 243.5,
    "ageYears": null,
    "fcLow": 90,
    "fcHigh": 180,
    "frHigh": 34,
    "percentiles": {
      "P5": {
        "systolic": 72,
        "diastolic": 37,
        "mean": 48.7
      },
      "P10": {
        "systolic": 76,
        "diastolic": 40,
        "mean": 52
      },
      "P50": {
        "systolic": 91,
        "diastolic": 53,
        "mean": 65.7
      },
      "P90": {
        "systolic": 106,
        "diastolic": 66,
        "mean": 79.3
      },
      "P95": {
        "systolic": 110,
        "diastolic": 70,
        "mean": 83.3
      }
    }
  },
  {
    "id": "9meses",
    "label": "9 meses",
    "ageDays": 273.9375,
    "ageYears": null,
    "fcLow": 90,
    "fcHigh": 180,
    "frHigh": 34,
    "percentiles": {
      "P5": {
        "systolic": 72,
        "diastolic": 37,
        "mean": 48.7
      },
      "P10": {
        "systolic": 76,
        "diastolic": 41,
        "mean": 52.7
      },
      "P50": {
        "systolic": 91,
        "diastolic": 54,
        "mean": 66.3
      },
      "P90": {
        "systolic": 106,
        "diastolic": 67,
        "mean": 80
      },
      "P95": {
        "systolic": 110,
        "diastolic": 70,
        "mean": 83.3
      }
    }
  },
  {
    "id": "10meses",
    "label": "10 meses",
    "ageDays": 304.375,
    "ageYears": null,
    "fcLow": 90,
    "fcHigh": 180,
    "frHigh": 34,
    "percentiles": {
      "P5": {
        "systolic": 72,
        "diastolic": 37,
        "mean": 48.7
      },
      "P10": {
        "systolic": 76,
        "diastolic": 41,
        "mean": 52.7
      },
      "P50": {
        "systolic": 91,
        "diastolic": 54,
        "mean": 66.3
      },
      "P90": {
        "systolic": 106,
        "diastolic": 67,
        "mean": 80
      },
      "P95": {
        "systolic": 110,
        "diastolic": 71,
        "mean": 84
      }
    }
  },
  {
    "id": "11meses",
    "label": "11 meses",
    "ageDays": 334.8125,
    "ageYears": null,
    "fcLow": 90,
    "fcHigh": 180,
    "frHigh": 34,
    "percentiles": {
      "P5": {
        "systolic": 72,
        "diastolic": 38,
        "mean": 49.3
      },
      "P10": {
        "systolic": 76,
        "diastolic": 41,
        "mean": 52.7
      },
      "P50": {
        "systolic": 91,
        "diastolic": 54,
        "mean": 66.3
      },
      "P90": {
        "systolic": 105,
        "diastolic": 67,
        "mean": 79.7
      },
      "P95": {
        "systolic": 110,
        "diastolic": 71,
        "mean": 84
      }
    }
  },
  {
    "id": "1ano-lactente",
    "label": "1 ano",
    "ageDays": 365,
    "ageYears": null,
    "fcLow": 90,
    "fcHigh": 180,
    "frHigh": 34,
    "percentiles": {
      "P5": {
        "systolic": 72,
        "diastolic": 38,
        "mean": 49.3
      },
      "P10": {
        "systolic": 76,
        "diastolic": 41,
        "mean": 52.7
      },
      "P50": {
        "systolic": 91,
        "diastolic": 54,
        "mean": 66.3
      },
      "P90": {
        "systolic": 105,
        "diastolic": 67,
        "mean": 79.7
      },
      "P95": {
        "systolic": 110,
        "diastolic": 71,
        "mean": 84
      }
    }
  }
];

export const MALE_BLOOD_PRESSURE_REFERENCES: BloodPressureReference[] = [
  {
    "id": "1ano-masculino",
    "label": "1 ano",
    "ageDays": 365.25,
    "ageYears": 1,
    "fcLow": 90,
    "fcHigh": 180,
    "frHigh": 34,
    "percentiles": {
      "P5": {
        "systolic": 72,
        "diastolic": 38,
        "mean": 49.3
      },
      "P10": {
        "systolic": 76,
        "diastolic": 41,
        "mean": 52.7
      },
      "P50": {
        "systolic": 91,
        "diastolic": 54,
        "mean": 66.3
      },
      "P90": {
        "systolic": 105,
        "diastolic": 67,
        "mean": 79.7
      },
      "P95": {
        "systolic": 110,
        "diastolic": 71,
        "mean": 84
      }
    }
  },
  {
    "id": "2anos-masculino",
    "label": "2 anos",
    "ageDays": 730.5,
    "ageYears": 2,
    "fcLow": 100,
    "fcHigh": 140,
    "frHigh": 22,
    "percentiles": {
      "P5": {
        "systolic": 71,
        "diastolic": 40,
        "mean": 50.3
      },
      "P10": {
        "systolic": 76,
        "diastolic": 43,
        "mean": 54
      },
      "P50": {
        "systolic": 90,
        "diastolic": 56,
        "mean": 67.3
      },
      "P90": {
        "systolic": 105,
        "diastolic": 69,
        "mean": 81
      },
      "P95": {
        "systolic": 109,
        "diastolic": 73,
        "mean": 85
      }
    }
  },
  {
    "id": "3anos-masculino",
    "label": "3 anos",
    "ageDays": 1095.75,
    "ageYears": 3,
    "fcLow": 100,
    "fcHigh": 140,
    "frHigh": 22,
    "percentiles": {
      "P5": {
        "systolic": 72,
        "diastolic": 40,
        "mean": 50.7
      },
      "P10": {
        "systolic": 76,
        "diastolic": 43,
        "mean": 54
      },
      "P50": {
        "systolic": 91,
        "diastolic": 56,
        "mean": 67.7
      },
      "P90": {
        "systolic": 106,
        "diastolic": 69,
        "mean": 81.3
      },
      "P95": {
        "systolic": 110,
        "diastolic": 73,
        "mean": 85.3
      }
    }
  },
  {
    "id": "4anos-masculino",
    "label": "4 anos",
    "ageDays": 1461.0,
    "ageYears": 4,
    "fcLow": 100,
    "fcHigh": 140,
    "frHigh": 22,
    "percentiles": {
      "P5": {
        "systolic": 73,
        "diastolic": 40,
        "mean": 51
      },
      "P10": {
        "systolic": 78,
        "diastolic": 43,
        "mean": 54.7
      },
      "P50": {
        "systolic": 92,
        "diastolic": 56,
        "mean": 68
      },
      "P90": {
        "systolic": 107,
        "diastolic": 69,
        "mean": 81.7
      },
      "P95": {
        "systolic": 111,
        "diastolic": 73,
        "mean": 85.7
      }
    }
  },
  {
    "id": "5anos-masculino",
    "label": "5 anos",
    "ageDays": 1826.25,
    "ageYears": 5,
    "fcLow": 100,
    "fcHigh": 140,
    "frHigh": 22,
    "percentiles": {
      "P5": {
        "systolic": 75,
        "diastolic": 40,
        "mean": 51.7
      },
      "P10": {
        "systolic": 79,
        "diastolic": 43,
        "mean": 55
      },
      "P50": {
        "systolic": 94,
        "diastolic": 56,
        "mean": 68.7
      },
      "P90": {
        "systolic": 109,
        "diastolic": 69,
        "mean": 82.3
      },
      "P95": {
        "systolic": 113,
        "diastolic": 73,
        "mean": 86.3
      }
    }
  },
  {
    "id": "6anos-masculino",
    "label": "6 anos",
    "ageDays": 2191.5,
    "ageYears": 6,
    "fcLow": 60,
    "fcHigh": 130,
    "frHigh": 18,
    "percentiles": {
      "P5": {
        "systolic": 77,
        "diastolic": 40,
        "mean": 52.3
      },
      "P10": {
        "systolic": 81,
        "diastolic": 44,
        "mean": 56.3
      },
      "P50": {
        "systolic": 96,
        "diastolic": 57,
        "mean": 70
      },
      "P90": {
        "systolic": 111,
        "diastolic": 70,
        "mean": 83.7
      },
      "P95": {
        "systolic": 115,
        "diastolic": 74,
        "mean": 87.7
      }
    }
  },
  {
    "id": "7anos-masculino",
    "label": "7 anos",
    "ageDays": 2556.75,
    "ageYears": 7,
    "fcLow": 60,
    "fcHigh": 130,
    "frHigh": 18,
    "percentiles": {
      "P5": {
        "systolic": 78,
        "diastolic": 41,
        "mean": 53.3
      },
      "P10": {
        "systolic": 83,
        "diastolic": 45,
        "mean": 57.7
      },
      "P50": {
        "systolic": 97,
        "diastolic": 58,
        "mean": 71
      },
      "P90": {
        "systolic": 112,
        "diastolic": 71,
        "mean": 84.7
      },
      "P95": {
        "systolic": 116,
        "diastolic": 75,
        "mean": 88.7
      }
    }
  },
  {
    "id": "8anos-masculino",
    "label": "8 anos",
    "ageDays": 2922.0,
    "ageYears": 8,
    "fcLow": 60,
    "fcHigh": 130,
    "frHigh": 18,
    "percentiles": {
      "P5": {
        "systolic": 80,
        "diastolic": 43,
        "mean": 55.3
      },
      "P10": {
        "systolic": 84,
        "diastolic": 46,
        "mean": 58.7
      },
      "P50": {
        "systolic": 98,
        "diastolic": 59,
        "mean": 72
      },
      "P90": {
        "systolic": 114,
        "diastolic": 72,
        "mean": 86
      },
      "P95": {
        "systolic": 118,
        "diastolic": 76,
        "mean": 90
      }
    }
  },
  {
    "id": "9anos-masculino",
    "label": "9 anos",
    "ageDays": 3287.25,
    "ageYears": 9,
    "fcLow": 60,
    "fcHigh": 130,
    "frHigh": 18,
    "percentiles": {
      "P5": {
        "systolic": 81,
        "diastolic": 44,
        "mean": 56.3
      },
      "P10": {
        "systolic": 86,
        "diastolic": 48,
        "mean": 60.7
      },
      "P50": {
        "systolic": 100,
        "diastolic": 61,
        "mean": 74
      },
      "P90": {
        "systolic": 115,
        "diastolic": 74,
        "mean": 87.7
      },
      "P95": {
        "systolic": 119,
        "diastolic": 77,
        "mean": 91
      }
    }
  },
  {
    "id": "10anos-masculino",
    "label": "10 anos",
    "ageDays": 3652.5,
    "ageYears": 10,
    "fcLow": 60,
    "fcHigh": 130,
    "frHigh": 18,
    "percentiles": {
      "P5": {
        "systolic": 83,
        "diastolic": 46,
        "mean": 58.3
      },
      "P10": {
        "systolic": 87,
        "diastolic": 49,
        "mean": 61.7
      },
      "P50": {
        "systolic": 102,
        "diastolic": 62,
        "mean": 75.3
      },
      "P90": {
        "systolic": 117,
        "diastolic": 75,
        "mean": 89
      },
      "P95": {
        "systolic": 121,
        "diastolic": 79,
        "mean": 93
      }
    }
  },
  {
    "id": "11anos-masculino",
    "label": "11 anos",
    "ageDays": 4017.75,
    "ageYears": 11,
    "fcLow": 60,
    "fcHigh": 130,
    "frHigh": 18,
    "percentiles": {
      "P5": {
        "systolic": 86,
        "diastolic": 47,
        "mean": 60
      },
      "P10": {
        "systolic": 90,
        "diastolic": 51,
        "mean": 64
      },
      "P50": {
        "systolic": 105,
        "diastolic": 64,
        "mean": 77.7
      },
      "P90": {
        "systolic": 119,
        "diastolic": 77,
        "mean": 91
      },
      "P95": {
        "systolic": 123,
        "diastolic": 81,
        "mean": 95
      }
    }
  },
  {
    "id": "12anos-masculino",
    "label": "12 anos",
    "ageDays": 4383.0,
    "ageYears": 12,
    "fcLow": 60,
    "fcHigh": 130,
    "frHigh": 18,
    "percentiles": {
      "P5": {
        "systolic": 88,
        "diastolic": 49,
        "mean": 62
      },
      "P10": {
        "systolic": 92,
        "diastolic": 53,
        "mean": 66
      },
      "P50": {
        "systolic": 107,
        "diastolic": 66,
        "mean": 79.7
      },
      "P90": {
        "systolic": 122,
        "diastolic": 78,
        "mean": 92.7
      },
      "P95": {
        "systolic": 126,
        "diastolic": 82,
        "mean": 96.7
      }
    }
  },
  {
    "id": "13anos-masculino",
    "label": "13 anos",
    "ageDays": 4748.25,
    "ageYears": 13,
    "fcLow": 60,
    "fcHigh": 110,
    "frHigh": 14,
    "percentiles": {
      "P5": {
        "systolic": 90,
        "diastolic": 46,
        "mean": 60.7
      },
      "P10": {
        "systolic": 94,
        "diastolic": 50,
        "mean": 64.7
      },
      "P50": {
        "systolic": 109,
        "diastolic": 64,
        "mean": 79
      },
      "P90": {
        "systolic": 124,
        "diastolic": 78,
        "mean": 93.3
      },
      "P95": {
        "systolic": 128,
        "diastolic": 82,
        "mean": 97.3
      }
    }
  },
  {
    "id": "14anos-masculino",
    "label": "14 anos",
    "ageDays": 5113.5,
    "ageYears": 14,
    "fcLow": 60,
    "fcHigh": 110,
    "frHigh": 14,
    "percentiles": {
      "P5": {
        "systolic": 92,
        "diastolic": 49,
        "mean": 63
      },
      "P10": {
        "systolic": 96,
        "diastolic": 53,
        "mean": 67.3
      },
      "P50": {
        "systolic": 110,
        "diastolic": 67,
        "mean": 81
      },
      "P90": {
        "systolic": 125,
        "diastolic": 81,
        "mean": 95
      },
      "P95": {
        "systolic": 129,
        "diastolic": 85,
        "mean": 99
      }
    }
  },
  {
    "id": "15anos-masculino",
    "label": "15 anos",
    "ageDays": 5478.75,
    "ageYears": 15,
    "fcLow": 60,
    "fcHigh": 110,
    "frHigh": 14,
    "percentiles": {
      "P5": {
        "systolic": 93,
        "diastolic": 49,
        "mean": 63.7
      },
      "P10": {
        "systolic": 97,
        "diastolic": 53,
        "mean": 67.7
      },
      "P50": {
        "systolic": 111,
        "diastolic": 67,
        "mean": 81.7
      },
      "P90": {
        "systolic": 126,
        "diastolic": 82,
        "mean": 96.7
      },
      "P95": {
        "systolic": 130,
        "diastolic": 86,
        "mean": 100.7
      }
    }
  },
  {
    "id": "16anos-masculino",
    "label": "16 anos",
    "ageDays": 5844.0,
    "ageYears": 16,
    "fcLow": 60,
    "fcHigh": 110,
    "frHigh": 14,
    "percentiles": {
      "P5": {
        "systolic": 93,
        "diastolic": 49,
        "mean": 63.7
      },
      "P10": {
        "systolic": 97,
        "diastolic": 53,
        "mean": 67.7
      },
      "P50": {
        "systolic": 112,
        "diastolic": 67,
        "mean": 82
      },
      "P90": {
        "systolic": 127,
        "diastolic": 81,
        "mean": 96.3
      },
      "P95": {
        "systolic": 131,
        "diastolic": 85,
        "mean": 100.3
      }
    }
  },
  {
    "id": "17anos-masculino",
    "label": "17 anos",
    "ageDays": 6209.25,
    "ageYears": 17,
    "fcLow": 60,
    "fcHigh": 110,
    "frHigh": 14,
    "percentiles": {
      "P5": {
        "systolic": 93,
        "diastolic": 48,
        "mean": 63
      },
      "P10": {
        "systolic": 98,
        "diastolic": 52,
        "mean": 67.3
      },
      "P50": {
        "systolic": 112,
        "diastolic": 66,
        "mean": 81.3
      },
      "P90": {
        "systolic": 127,
        "diastolic": 80,
        "mean": 95.7
      },
      "P95": {
        "systolic": 131,
        "diastolic": 84,
        "mean": 99.7
      }
    }
  },
  {
    "id": "18anos-masculino",
    "label": "18 anos",
    "ageDays": 6574.5,
    "ageYears": 18,
    "fcLow": 60,
    "fcHigh": 110,
    "frHigh": 14,
    "percentiles": {
      "P5": {
        "systolic": 94,
        "diastolic": 48,
        "mean": 63.3
      },
      "P10": {
        "systolic": 98,
        "diastolic": 52,
        "mean": 67.3
      },
      "P50": {
        "systolic": 112,
        "diastolic": 66,
        "mean": 81.3
      },
      "P90": {
        "systolic": 127,
        "diastolic": 80,
        "mean": 95.7
      },
      "P95": {
        "systolic": 131,
        "diastolic": 84,
        "mean": 99.7
      }
    }
  }
];

export const FEMALE_BLOOD_PRESSURE_REFERENCES: BloodPressureReference[] = [
  {
    "id": "1ano-feminino",
    "label": "1 ano",
    "ageDays": 365.25,
    "ageYears": 1,
    "fcLow": 90,
    "fcHigh": 180,
    "frHigh": 34,
    "percentiles": {
      "P5": {
        "systolic": 72,
        "diastolic": 38,
        "mean": 49.3
      },
      "P10": {
        "systolic": 76,
        "diastolic": 41,
        "mean": 52.7
      },
      "P50": {
        "systolic": 91,
        "diastolic": 54,
        "mean": 66.3
      },
      "P90": {
        "systolic": 105,
        "diastolic": 67,
        "mean": 79.7
      },
      "P95": {
        "systolic": 110,
        "diastolic": 71,
        "mean": 84
      }
    }
  },
  {
    "id": "2anos-feminino",
    "label": "2 anos",
    "ageDays": 730.5,
    "ageYears": 2,
    "fcLow": 100,
    "fcHigh": 140,
    "frHigh": 22,
    "percentiles": {
      "P5": {
        "systolic": 71,
        "diastolic": 40,
        "mean": 50.3
      },
      "P10": {
        "systolic": 76,
        "diastolic": 43,
        "mean": 54
      },
      "P50": {
        "systolic": 90,
        "diastolic": 56,
        "mean": 67.3
      },
      "P90": {
        "systolic": 105,
        "diastolic": 69,
        "mean": 81
      },
      "P95": {
        "systolic": 109,
        "diastolic": 73,
        "mean": 85
      }
    }
  },
  {
    "id": "3anos-feminino",
    "label": "3 anos",
    "ageDays": 1095.75,
    "ageYears": 3,
    "fcLow": 100,
    "fcHigh": 140,
    "frHigh": 22,
    "percentiles": {
      "P5": {
        "systolic": 72,
        "diastolic": 40,
        "mean": 50.7
      },
      "P10": {
        "systolic": 76,
        "diastolic": 43,
        "mean": 54
      },
      "P50": {
        "systolic": 91,
        "diastolic": 56,
        "mean": 67.7
      },
      "P90": {
        "systolic": 106,
        "diastolic": 69,
        "mean": 81.3
      },
      "P95": {
        "systolic": 110,
        "diastolic": 73,
        "mean": 85.3
      }
    }
  },
  {
    "id": "4anos-feminino",
    "label": "4 anos",
    "ageDays": 1461.0,
    "ageYears": 4,
    "fcLow": 100,
    "fcHigh": 140,
    "frHigh": 22,
    "percentiles": {
      "P5": {
        "systolic": 73,
        "diastolic": 40,
        "mean": 51
      },
      "P10": {
        "systolic": 78,
        "diastolic": 43,
        "mean": 54.7
      },
      "P50": {
        "systolic": 92,
        "diastolic": 56,
        "mean": 68
      },
      "P90": {
        "systolic": 107,
        "diastolic": 69,
        "mean": 81.7
      },
      "P95": {
        "systolic": 111,
        "diastolic": 73,
        "mean": 85.7
      }
    }
  },
  {
    "id": "5anos-feminino",
    "label": "5 anos",
    "ageDays": 1826.25,
    "ageYears": 5,
    "fcLow": 100,
    "fcHigh": 140,
    "frHigh": 22,
    "percentiles": {
      "P5": {
        "systolic": 75,
        "diastolic": 40,
        "mean": 51.7
      },
      "P10": {
        "systolic": 79,
        "diastolic": 43,
        "mean": 55
      },
      "P50": {
        "systolic": 94,
        "diastolic": 56,
        "mean": 68.7
      },
      "P90": {
        "systolic": 109,
        "diastolic": 69,
        "mean": 82.3
      },
      "P95": {
        "systolic": 113,
        "diastolic": 73,
        "mean": 86.3
      }
    }
  },
  {
    "id": "6anos-feminino",
    "label": "6 anos",
    "ageDays": 2191.5,
    "ageYears": 6,
    "fcLow": 60,
    "fcHigh": 130,
    "frHigh": 18,
    "percentiles": {
      "P5": {
        "systolic": 77,
        "diastolic": 40,
        "mean": 52.3
      },
      "P10": {
        "systolic": 81,
        "diastolic": 44,
        "mean": 56.3
      },
      "P50": {
        "systolic": 96,
        "diastolic": 57,
        "mean": 70
      },
      "P90": {
        "systolic": 111,
        "diastolic": 70,
        "mean": 83.7
      },
      "P95": {
        "systolic": 115,
        "diastolic": 74,
        "mean": 87.7
      }
    }
  },
  {
    "id": "7anos-feminino",
    "label": "7 anos",
    "ageDays": 2556.75,
    "ageYears": 7,
    "fcLow": 60,
    "fcHigh": 130,
    "frHigh": 18,
    "percentiles": {
      "P5": {
        "systolic": 78,
        "diastolic": 41,
        "mean": 53.3
      },
      "P10": {
        "systolic": 83,
        "diastolic": 45,
        "mean": 57.7
      },
      "P50": {
        "systolic": 97,
        "diastolic": 58,
        "mean": 71
      },
      "P90": {
        "systolic": 112,
        "diastolic": 71,
        "mean": 84.7
      },
      "P95": {
        "systolic": 116,
        "diastolic": 75,
        "mean": 88.7
      }
    }
  },
  {
    "id": "8anos-feminino",
    "label": "8 anos",
    "ageDays": 2922.0,
    "ageYears": 8,
    "fcLow": 60,
    "fcHigh": 130,
    "frHigh": 18,
    "percentiles": {
      "P5": {
        "systolic": 80,
        "diastolic": 43,
        "mean": 55.3
      },
      "P10": {
        "systolic": 84,
        "diastolic": 46,
        "mean": 58.7
      },
      "P50": {
        "systolic": 98,
        "diastolic": 59,
        "mean": 72
      },
      "P90": {
        "systolic": 114,
        "diastolic": 72,
        "mean": 86
      },
      "P95": {
        "systolic": 118,
        "diastolic": 76,
        "mean": 90
      }
    }
  },
  {
    "id": "9anos-feminino",
    "label": "9 anos",
    "ageDays": 3287.25,
    "ageYears": 9,
    "fcLow": 60,
    "fcHigh": 130,
    "frHigh": 18,
    "percentiles": {
      "P5": {
        "systolic": 81,
        "diastolic": 44,
        "mean": 56.3
      },
      "P10": {
        "systolic": 86,
        "diastolic": 48,
        "mean": 60.7
      },
      "P50": {
        "systolic": 100,
        "diastolic": 61,
        "mean": 74
      },
      "P90": {
        "systolic": 115,
        "diastolic": 74,
        "mean": 87.7
      },
      "P95": {
        "systolic": 119,
        "diastolic": 77,
        "mean": 91
      }
    }
  },
  {
    "id": "10anos-feminino",
    "label": "10 anos",
    "ageDays": 3652.5,
    "ageYears": 10,
    "fcLow": 60,
    "fcHigh": 130,
    "frHigh": 18,
    "percentiles": {
      "P5": {
        "systolic": 83,
        "diastolic": 46,
        "mean": 58.3
      },
      "P10": {
        "systolic": 87,
        "diastolic": 49,
        "mean": 61.7
      },
      "P50": {
        "systolic": 102,
        "diastolic": 62,
        "mean": 75.3
      },
      "P90": {
        "systolic": 117,
        "diastolic": 75,
        "mean": 89
      },
      "P95": {
        "systolic": 121,
        "diastolic": 79,
        "mean": 93
      }
    }
  },
  {
    "id": "11anos-feminino",
    "label": "11 anos",
    "ageDays": 4017.75,
    "ageYears": 11,
    "fcLow": 60,
    "fcHigh": 130,
    "frHigh": 18,
    "percentiles": {
      "P5": {
        "systolic": 86,
        "diastolic": 47,
        "mean": 60
      },
      "P10": {
        "systolic": 90,
        "diastolic": 51,
        "mean": 64
      },
      "P50": {
        "systolic": 105,
        "diastolic": 64,
        "mean": 77.7
      },
      "P90": {
        "systolic": 119,
        "diastolic": 77,
        "mean": 91
      },
      "P95": {
        "systolic": 123,
        "diastolic": 81,
        "mean": 95
      }
    }
  },
  {
    "id": "12anos-feminino",
    "label": "12 anos",
    "ageDays": 4383.0,
    "ageYears": 12,
    "fcLow": 60,
    "fcHigh": 130,
    "frHigh": 18,
    "percentiles": {
      "P5": {
        "systolic": 88,
        "diastolic": 49,
        "mean": 62
      },
      "P10": {
        "systolic": 92,
        "diastolic": 53,
        "mean": 66
      },
      "P50": {
        "systolic": 107,
        "diastolic": 66,
        "mean": 79.7
      },
      "P90": {
        "systolic": 122,
        "diastolic": 78,
        "mean": 92.7
      },
      "P95": {
        "systolic": 126,
        "diastolic": 82,
        "mean": 96.7
      }
    }
  },
  {
    "id": "13anos-feminino",
    "label": "13 anos",
    "ageDays": 4748.25,
    "ageYears": 13,
    "fcLow": 60,
    "fcHigh": 110,
    "frHigh": 14,
    "percentiles": {
      "P5": {
        "systolic": 90,
        "diastolic": 46,
        "mean": 60.7
      },
      "P10": {
        "systolic": 94,
        "diastolic": 50,
        "mean": 64.7
      },
      "P50": {
        "systolic": 109,
        "diastolic": 64,
        "mean": 79
      },
      "P90": {
        "systolic": 124,
        "diastolic": 78,
        "mean": 93.3
      },
      "P95": {
        "systolic": 128,
        "diastolic": 82,
        "mean": 97.3
      }
    }
  },
  {
    "id": "14anos-feminino",
    "label": "14 anos",
    "ageDays": 5113.5,
    "ageYears": 14,
    "fcLow": 60,
    "fcHigh": 110,
    "frHigh": 14,
    "percentiles": {
      "P5": {
        "systolic": 92,
        "diastolic": 49,
        "mean": 63
      },
      "P10": {
        "systolic": 96,
        "diastolic": 53,
        "mean": 67.3
      },
      "P50": {
        "systolic": 110,
        "diastolic": 67,
        "mean": 81
      },
      "P90": {
        "systolic": 125,
        "diastolic": 81,
        "mean": 95
      },
      "P95": {
        "systolic": 129,
        "diastolic": 85,
        "mean": 99
      }
    }
  },
  {
    "id": "15anos-feminino",
    "label": "15 anos",
    "ageDays": 5478.75,
    "ageYears": 15,
    "fcLow": 60,
    "fcHigh": 110,
    "frHigh": 14,
    "percentiles": {
      "P5": {
        "systolic": 93,
        "diastolic": 49,
        "mean": 63.7
      },
      "P10": {
        "systolic": 97,
        "diastolic": 53,
        "mean": 67.7
      },
      "P50": {
        "systolic": 111,
        "diastolic": 67,
        "mean": 81.7
      },
      "P90": {
        "systolic": 126,
        "diastolic": 82,
        "mean": 96.7
      },
      "P95": {
        "systolic": 130,
        "diastolic": 86,
        "mean": 100
      }
    }
  },
  {
    "id": "16anos-feminino",
    "label": "16 anos",
    "ageDays": 5844.0,
    "ageYears": 16,
    "fcLow": 60,
    "fcHigh": 110,
    "frHigh": 14,
    "percentiles": {
      "P5": {
        "systolic": 93,
        "diastolic": 49,
        "mean": 63.7
      },
      "P10": {
        "systolic": 97,
        "diastolic": 53,
        "mean": 67.7
      },
      "P50": {
        "systolic": 112,
        "diastolic": 67,
        "mean": 82
      },
      "P90": {
        "systolic": 127,
        "diastolic": 81,
        "mean": 96.3
      },
      "P95": {
        "systolic": 131,
        "diastolic": 85,
        "mean": 100.3
      }
    }
  },
  {
    "id": "17anos-feminino",
    "label": "17 anos",
    "ageDays": 6209.25,
    "ageYears": 17,
    "fcLow": 60,
    "fcHigh": 110,
    "frHigh": 14,
    "percentiles": {
      "P5": {
        "systolic": 93,
        "diastolic": 48,
        "mean": 63
      },
      "P10": {
        "systolic": 98,
        "diastolic": 52,
        "mean": 67.3
      },
      "P50": {
        "systolic": 112,
        "diastolic": 66,
        "mean": 81.3
      },
      "P90": {
        "systolic": 127,
        "diastolic": 80,
        "mean": 95.7
      },
      "P95": {
        "systolic": 131,
        "diastolic": 84,
        "mean": 99.7
      }
    }
  },
  {
    "id": "18anos-feminino",
    "label": "18 anos",
    "ageDays": 6574.5,
    "ageYears": 18,
    "fcLow": 60,
    "fcHigh": 110,
    "frHigh": 14,
    "percentiles": {
      "P5": {
        "systolic": 94,
        "diastolic": 48,
        "mean": 63.3
      },
      "P10": {
        "systolic": 98,
        "diastolic": 52,
        "mean": 67.3
      },
      "P50": {
        "systolic": 112,
        "diastolic": 66,
        "mean": 81.3
      },
      "P90": {
        "systolic": 127,
        "diastolic": 80,
        "mean": 95.7
      },
      "P95": {
        "systolic": 131,
        "diastolic": 84,
        "mean": 99.7
      }
    }
  }
];

