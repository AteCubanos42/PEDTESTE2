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
  P95Plus12: BloodPressurePercentile | null;
};

export type BloodPressureReference = {
  id: string;
  label: string;
  ageDays: number;
  ageYears: number | null;
  heightP50Cm: number | null;
  fcLow: number | null;
  fcHigh: number | null;
  frHigh: number | null;
  lowerPercentilesEstimated: boolean;
  percentiles: BloodPressurePercentiles;
};

// Para 1–17 anos, P50/P90/P95/P95+12 são os valores da tabela da SBP na coluna de estatura P50.
// P5 e P10 não constam da tabela publicada e foram estimados por simetria dos quantis em torno do P50:
// P10 = 2 × P50 − P90; P5 = 2 × P50 − P95.
// A PAM é calculada por (PAS + 2 × PAD) ÷ 3.

export const INFANT_BLOOD_PRESSURE_REFERENCES: BloodPressureReference[] = [
  {
    "id": "1dia",
    "label": "1 dia",
    "ageDays": 1,
    "ageYears": null,
    "heightP50Cm": null,
    "fcLow": 90,
    "fcHigh": 180,
    "frHigh": 34,
    "lowerPercentilesEstimated": false,
    "percentiles": {
      "P5": {
        "systolic": 46.0,
        "diastolic": 38.0,
        "mean": 40.7
      },
      "P10": {
        "systolic": 50.0,
        "diastolic": 42.0,
        "mean": 44.7
      },
      "P50": {
        "systolic": 65.0,
        "diastolic": 55.0,
        "mean": 58.3
      },
      "P90": {
        "systolic": 80.0,
        "diastolic": 68.0,
        "mean": 72.0
      },
      "P95": {
        "systolic": 84.0,
        "diastolic": 72.0,
        "mean": 76.0
      },
      "P95Plus12": null
    }
  },
  {
    "id": "3dias",
    "label": "3 dias",
    "ageDays": 3,
    "ageYears": null,
    "heightP50Cm": null,
    "fcLow": 90,
    "fcHigh": 180,
    "frHigh": 34,
    "lowerPercentilesEstimated": false,
    "percentiles": {
      "P5": {
        "systolic": 53.0,
        "diastolic": 38.0,
        "mean": 43.0
      },
      "P10": {
        "systolic": 57.0,
        "diastolic": 42.0,
        "mean": 47.0
      },
      "P50": {
        "systolic": 72.0,
        "diastolic": 55.0,
        "mean": 60.7
      },
      "P90": {
        "systolic": 86.0,
        "diastolic": 68.0,
        "mean": 74.0
      },
      "P95": {
        "systolic": 90.0,
        "diastolic": 71.0,
        "mean": 77.3
      },
      "P95Plus12": null
    }
  },
  {
    "id": "7dias",
    "label": "7 dias",
    "ageDays": 7,
    "ageYears": null,
    "heightP50Cm": null,
    "fcLow": 90,
    "fcHigh": 180,
    "frHigh": 34,
    "lowerPercentilesEstimated": false,
    "percentiles": {
      "P5": {
        "systolic": 60.0,
        "diastolic": 38.0,
        "mean": 45.3
      },
      "P10": {
        "systolic": 64.0,
        "diastolic": 41.0,
        "mean": 48.7
      },
      "P50": {
        "systolic": 78.0,
        "diastolic": 54.0,
        "mean": 62.0
      },
      "P90": {
        "systolic": 93.0,
        "diastolic": 67.0,
        "mean": 75.7
      },
      "P95": {
        "systolic": 97.0,
        "diastolic": 71.0,
        "mean": 79.7
      },
      "P95Plus12": null
    }
  },
  {
    "id": "1mes",
    "label": "1 mês",
    "ageDays": 30.4375,
    "ageYears": null,
    "heightP50Cm": null,
    "fcLow": 90,
    "fcHigh": 180,
    "frHigh": 34,
    "lowerPercentilesEstimated": false,
    "percentiles": {
      "P5": {
        "systolic": 67.0,
        "diastolic": 35.0,
        "mean": 45.7
      },
      "P10": {
        "systolic": 71.0,
        "diastolic": 39.0,
        "mean": 49.7
      },
      "P50": {
        "systolic": 86.0,
        "diastolic": 52.0,
        "mean": 63.3
      },
      "P90": {
        "systolic": 101.0,
        "diastolic": 64.0,
        "mean": 76.3
      },
      "P95": {
        "systolic": 105.0,
        "diastolic": 68.0,
        "mean": 80.3
      },
      "P95Plus12": null
    }
  },
  {
    "id": "2meses",
    "label": "2 meses",
    "ageDays": 60.875,
    "ageYears": null,
    "heightP50Cm": null,
    "fcLow": 90,
    "fcHigh": 180,
    "frHigh": 34,
    "lowerPercentilesEstimated": false,
    "percentiles": {
      "P5": {
        "systolic": 68.0,
        "diastolic": 34.0,
        "mean": 45.3
      },
      "P10": {
        "systolic": 72.0,
        "diastolic": 38.0,
        "mean": 49.3
      },
      "P50": {
        "systolic": 87.0,
        "diastolic": 51.0,
        "mean": 63.0
      },
      "P90": {
        "systolic": 101.0,
        "diastolic": 64.0,
        "mean": 76.3
      },
      "P95": {
        "systolic": 106.0,
        "diastolic": 68.0,
        "mean": 80.7
      },
      "P95Plus12": null
    }
  },
  {
    "id": "3meses",
    "label": "3 meses",
    "ageDays": 91.3125,
    "ageYears": null,
    "heightP50Cm": null,
    "fcLow": 90,
    "fcHigh": 180,
    "frHigh": 34,
    "lowerPercentilesEstimated": false,
    "percentiles": {
      "P5": {
        "systolic": 70.0,
        "diastolic": 35.0,
        "mean": 46.7
      },
      "P10": {
        "systolic": 74.0,
        "diastolic": 38.0,
        "mean": 50.0
      },
      "P50": {
        "systolic": 89.0,
        "diastolic": 51.0,
        "mean": 63.7
      },
      "P90": {
        "systolic": 104.0,
        "diastolic": 64.0,
        "mean": 77.3
      },
      "P95": {
        "systolic": 108.0,
        "diastolic": 68.0,
        "mean": 81.3
      },
      "P95Plus12": null
    }
  },
  {
    "id": "4meses",
    "label": "4 meses",
    "ageDays": 121.75,
    "ageYears": null,
    "heightP50Cm": null,
    "fcLow": 90,
    "fcHigh": 180,
    "frHigh": 34,
    "lowerPercentilesEstimated": false,
    "percentiles": {
      "P5": {
        "systolic": 71.0,
        "diastolic": 35.0,
        "mean": 47.0
      },
      "P10": {
        "systolic": 75.0,
        "diastolic": 39.0,
        "mean": 51.0
      },
      "P50": {
        "systolic": 90.0,
        "diastolic": 52.0,
        "mean": 64.7
      },
      "P90": {
        "systolic": 105.0,
        "diastolic": 65.0,
        "mean": 78.3
      },
      "P95": {
        "systolic": 109.0,
        "diastolic": 68.0,
        "mean": 81.7
      },
      "P95Plus12": null
    }
  },
  {
    "id": "5meses",
    "label": "5 meses",
    "ageDays": 152.1875,
    "ageYears": null,
    "heightP50Cm": null,
    "fcLow": 90,
    "fcHigh": 180,
    "frHigh": 34,
    "lowerPercentilesEstimated": false,
    "percentiles": {
      "P5": {
        "systolic": 72.0,
        "diastolic": 36.0,
        "mean": 48.0
      },
      "P10": {
        "systolic": 76.0,
        "diastolic": 39.0,
        "mean": 51.3
      },
      "P50": {
        "systolic": 91.0,
        "diastolic": 53.0,
        "mean": 65.7
      },
      "P90": {
        "systolic": 106.0,
        "diastolic": 65.0,
        "mean": 78.7
      },
      "P95": {
        "systolic": 110.0,
        "diastolic": 69.0,
        "mean": 82.7
      },
      "P95Plus12": null
    }
  },
  {
    "id": "6meses",
    "label": "6 meses",
    "ageDays": 182.625,
    "ageYears": null,
    "heightP50Cm": null,
    "fcLow": 90,
    "fcHigh": 180,
    "frHigh": 34,
    "lowerPercentilesEstimated": false,
    "percentiles": {
      "P5": {
        "systolic": 72.0,
        "diastolic": 36.0,
        "mean": 48.0
      },
      "P10": {
        "systolic": 76.0,
        "diastolic": 40.0,
        "mean": 52.0
      },
      "P50": {
        "systolic": 91.0,
        "diastolic": 53.0,
        "mean": 65.7
      },
      "P90": {
        "systolic": 106.0,
        "diastolic": 66.0,
        "mean": 79.3
      },
      "P95": {
        "systolic": 110.0,
        "diastolic": 69.0,
        "mean": 82.7
      },
      "P95Plus12": null
    }
  },
  {
    "id": "7meses",
    "label": "7 meses",
    "ageDays": 213.0625,
    "ageYears": null,
    "heightP50Cm": null,
    "fcLow": 90,
    "fcHigh": 180,
    "frHigh": 34,
    "lowerPercentilesEstimated": false,
    "percentiles": {
      "P5": {
        "systolic": 72.0,
        "diastolic": 36.0,
        "mean": 48.0
      },
      "P10": {
        "systolic": 76.0,
        "diastolic": 40.0,
        "mean": 52.0
      },
      "P50": {
        "systolic": 91.0,
        "diastolic": 53.0,
        "mean": 65.7
      },
      "P90": {
        "systolic": 106.0,
        "diastolic": 66.0,
        "mean": 79.3
      },
      "P95": {
        "systolic": 110.0,
        "diastolic": 70.0,
        "mean": 83.3
      },
      "P95Plus12": null
    }
  },
  {
    "id": "8meses",
    "label": "8 meses",
    "ageDays": 243.5,
    "ageYears": null,
    "heightP50Cm": null,
    "fcLow": 90,
    "fcHigh": 180,
    "frHigh": 34,
    "lowerPercentilesEstimated": false,
    "percentiles": {
      "P5": {
        "systolic": 72.0,
        "diastolic": 37.0,
        "mean": 48.7
      },
      "P10": {
        "systolic": 76.0,
        "diastolic": 40.0,
        "mean": 52.0
      },
      "P50": {
        "systolic": 91.0,
        "diastolic": 53.0,
        "mean": 65.7
      },
      "P90": {
        "systolic": 106.0,
        "diastolic": 66.0,
        "mean": 79.3
      },
      "P95": {
        "systolic": 110.0,
        "diastolic": 70.0,
        "mean": 83.3
      },
      "P95Plus12": null
    }
  },
  {
    "id": "9meses",
    "label": "9 meses",
    "ageDays": 273.9375,
    "ageYears": null,
    "heightP50Cm": null,
    "fcLow": 90,
    "fcHigh": 180,
    "frHigh": 34,
    "lowerPercentilesEstimated": false,
    "percentiles": {
      "P5": {
        "systolic": 72.0,
        "diastolic": 37.0,
        "mean": 48.7
      },
      "P10": {
        "systolic": 76.0,
        "diastolic": 41.0,
        "mean": 52.7
      },
      "P50": {
        "systolic": 91.0,
        "diastolic": 54.0,
        "mean": 66.3
      },
      "P90": {
        "systolic": 106.0,
        "diastolic": 67.0,
        "mean": 80.0
      },
      "P95": {
        "systolic": 110.0,
        "diastolic": 70.0,
        "mean": 83.3
      },
      "P95Plus12": null
    }
  },
  {
    "id": "10meses",
    "label": "10 meses",
    "ageDays": 304.375,
    "ageYears": null,
    "heightP50Cm": null,
    "fcLow": 90,
    "fcHigh": 180,
    "frHigh": 34,
    "lowerPercentilesEstimated": false,
    "percentiles": {
      "P5": {
        "systolic": 72.0,
        "diastolic": 37.0,
        "mean": 48.7
      },
      "P10": {
        "systolic": 76.0,
        "diastolic": 41.0,
        "mean": 52.7
      },
      "P50": {
        "systolic": 91.0,
        "diastolic": 54.0,
        "mean": 66.3
      },
      "P90": {
        "systolic": 106.0,
        "diastolic": 67.0,
        "mean": 80.0
      },
      "P95": {
        "systolic": 110.0,
        "diastolic": 71.0,
        "mean": 84.0
      },
      "P95Plus12": null
    }
  },
  {
    "id": "11meses",
    "label": "11 meses",
    "ageDays": 334.8125,
    "ageYears": null,
    "heightP50Cm": null,
    "fcLow": 90,
    "fcHigh": 180,
    "frHigh": 34,
    "lowerPercentilesEstimated": false,
    "percentiles": {
      "P5": {
        "systolic": 72.0,
        "diastolic": 38.0,
        "mean": 49.3
      },
      "P10": {
        "systolic": 76.0,
        "diastolic": 41.0,
        "mean": 52.7
      },
      "P50": {
        "systolic": 91.0,
        "diastolic": 54.0,
        "mean": 66.3
      },
      "P90": {
        "systolic": 105.0,
        "diastolic": 67.0,
        "mean": 79.7
      },
      "P95": {
        "systolic": 110.0,
        "diastolic": 71.0,
        "mean": 84.0
      },
      "P95Plus12": null
    }
  }
];

export const MALE_BLOOD_PRESSURE_REFERENCES: BloodPressureReference[] = [
  {
    "id": "1ano-masculino",
    "label": "1 ano",
    "ageDays": 365.25,
    "ageYears": 1,
    "heightP50Cm": 82.4,
    "fcLow": 90,
    "fcHigh": 180,
    "frHigh": 34,
    "lowerPercentilesEstimated": true,
    "percentiles": {
      "P5": {
        "systolic": 69,
        "diastolic": 27,
        "mean": 41.0
      },
      "P10": {
        "systolic": 72,
        "diastolic": 29,
        "mean": 43.3
      },
      "P50": {
        "systolic": 86,
        "diastolic": 41,
        "mean": 56.0
      },
      "P90": {
        "systolic": 100,
        "diastolic": 53,
        "mean": 68.7
      },
      "P95": {
        "systolic": 103,
        "diastolic": 55,
        "mean": 71.0
      },
      "P95Plus12": {
        "systolic": 115,
        "diastolic": 67,
        "mean": 83.0
      }
    }
  },
  {
    "id": "2anos-masculino",
    "label": "2 anos",
    "ageDays": 730.5,
    "ageYears": 2,
    "heightP50Cm": 92.1,
    "fcLow": 100,
    "fcHigh": 140,
    "frHigh": 22,
    "lowerPercentilesEstimated": true,
    "percentiles": {
      "P5": {
        "systolic": 72,
        "diastolic": 29,
        "mean": 43.3
      },
      "P10": {
        "systolic": 76,
        "diastolic": 32,
        "mean": 46.7
      },
      "P50": {
        "systolic": 89,
        "diastolic": 44,
        "mean": 59.0
      },
      "P90": {
        "systolic": 102,
        "diastolic": 56,
        "mean": 71.3
      },
      "P95": {
        "systolic": 106,
        "diastolic": 59,
        "mean": 74.7
      },
      "P95Plus12": {
        "systolic": 118,
        "diastolic": 71,
        "mean": 86.7
      }
    }
  },
  {
    "id": "3anos-masculino",
    "label": "3 anos",
    "ageDays": 1095.75,
    "ageYears": 3,
    "heightP50Cm": 99.0,
    "fcLow": 100,
    "fcHigh": 140,
    "frHigh": 22,
    "lowerPercentilesEstimated": true,
    "percentiles": {
      "P5": {
        "systolic": 73,
        "diastolic": 32,
        "mean": 45.7
      },
      "P10": {
        "systolic": 77,
        "diastolic": 35,
        "mean": 49.0
      },
      "P50": {
        "systolic": 90,
        "diastolic": 47,
        "mean": 61.3
      },
      "P90": {
        "systolic": 103,
        "diastolic": 59,
        "mean": 73.7
      },
      "P95": {
        "systolic": 107,
        "diastolic": 62,
        "mean": 77.0
      },
      "P95Plus12": {
        "systolic": 119,
        "diastolic": 74,
        "mean": 89.0
      }
    }
  },
  {
    "id": "4anos-masculino",
    "label": "4 anos",
    "ageDays": 1461.0,
    "ageYears": 4,
    "heightP50Cm": 105.9,
    "fcLow": 100,
    "fcHigh": 140,
    "frHigh": 22,
    "lowerPercentilesEstimated": true,
    "percentiles": {
      "P5": {
        "systolic": 76,
        "diastolic": 34,
        "mean": 48.0
      },
      "P10": {
        "systolic": 79,
        "diastolic": 38,
        "mean": 51.7
      },
      "P50": {
        "systolic": 92,
        "diastolic": 50,
        "mean": 64.0
      },
      "P90": {
        "systolic": 105,
        "diastolic": 62,
        "mean": 76.3
      },
      "P95": {
        "systolic": 108,
        "diastolic": 66,
        "mean": 80.0
      },
      "P95Plus12": {
        "systolic": 120,
        "diastolic": 78,
        "mean": 92.0
      }
    }
  },
  {
    "id": "5anos-masculino",
    "label": "5 anos",
    "ageDays": 1826.25,
    "ageYears": 5,
    "heightP50Cm": 112.4,
    "fcLow": 100,
    "fcHigh": 140,
    "frHigh": 22,
    "lowerPercentilesEstimated": true,
    "percentiles": {
      "P5": {
        "systolic": 79,
        "diastolic": 37,
        "mean": 51.0
      },
      "P10": {
        "systolic": 82,
        "diastolic": 41,
        "mean": 54.7
      },
      "P50": {
        "systolic": 94,
        "diastolic": 53,
        "mean": 66.7
      },
      "P90": {
        "systolic": 106,
        "diastolic": 65,
        "mean": 78.7
      },
      "P95": {
        "systolic": 109,
        "diastolic": 69,
        "mean": 82.3
      },
      "P95Plus12": {
        "systolic": 121,
        "diastolic": 81,
        "mean": 94.3
      }
    }
  },
  {
    "id": "6anos-masculino",
    "label": "6 anos",
    "ageDays": 2191.5,
    "ageYears": 6,
    "heightP50Cm": 118.9,
    "fcLow": 60,
    "fcHigh": 130,
    "frHigh": 18,
    "lowerPercentilesEstimated": true,
    "percentiles": {
      "P5": {
        "systolic": 79,
        "diastolic": 41,
        "mean": 53.7
      },
      "P10": {
        "systolic": 83,
        "diastolic": 44,
        "mean": 57.0
      },
      "P50": {
        "systolic": 95,
        "diastolic": 56,
        "mean": 69.0
      },
      "P90": {
        "systolic": 107,
        "diastolic": 68,
        "mean": 81.0
      },
      "P95": {
        "systolic": 111,
        "diastolic": 71,
        "mean": 84.3
      },
      "P95Plus12": {
        "systolic": 123,
        "diastolic": 83,
        "mean": 96.3
      }
    }
  },
  {
    "id": "7anos-masculino",
    "label": "7 anos",
    "ageDays": 2556.75,
    "ageYears": 7,
    "heightP50Cm": 125.1,
    "fcLow": 60,
    "fcHigh": 130,
    "frHigh": 18,
    "lowerPercentilesEstimated": true,
    "percentiles": {
      "P5": {
        "systolic": 82,
        "diastolic": 43,
        "mean": 56.0
      },
      "P10": {
        "systolic": 85,
        "diastolic": 46,
        "mean": 59.0
      },
      "P50": {
        "systolic": 97,
        "diastolic": 58,
        "mean": 71.0
      },
      "P90": {
        "systolic": 109,
        "diastolic": 70,
        "mean": 83.0
      },
      "P95": {
        "systolic": 112,
        "diastolic": 73,
        "mean": 86.0
      },
      "P95Plus12": {
        "systolic": 124,
        "diastolic": 85,
        "mean": 98.0
      }
    }
  },
  {
    "id": "8anos-masculino",
    "label": "8 anos",
    "ageDays": 2922.0,
    "ageYears": 8,
    "heightP50Cm": 131.0,
    "fcLow": 60,
    "fcHigh": 130,
    "frHigh": 18,
    "lowerPercentilesEstimated": true,
    "percentiles": {
      "P5": {
        "systolic": 82,
        "diastolic": 44,
        "mean": 56.7
      },
      "P10": {
        "systolic": 86,
        "diastolic": 47,
        "mean": 60.0
      },
      "P50": {
        "systolic": 98,
        "diastolic": 59,
        "mean": 72.0
      },
      "P90": {
        "systolic": 110,
        "diastolic": 71,
        "mean": 84.0
      },
      "P95": {
        "systolic": 114,
        "diastolic": 74,
        "mean": 87.3
      },
      "P95Plus12": {
        "systolic": 126,
        "diastolic": 86,
        "mean": 99.3
      }
    }
  },
  {
    "id": "9anos-masculino",
    "label": "9 anos",
    "ageDays": 3287.25,
    "ageYears": 9,
    "heightP50Cm": 136.3,
    "fcLow": 60,
    "fcHigh": 130,
    "frHigh": 18,
    "lowerPercentilesEstimated": true,
    "percentiles": {
      "P5": {
        "systolic": 83,
        "diastolic": 44,
        "mean": 57.0
      },
      "P10": {
        "systolic": 88,
        "diastolic": 47,
        "mean": 60.7
      },
      "P50": {
        "systolic": 99,
        "diastolic": 60,
        "mean": 73.0
      },
      "P90": {
        "systolic": 110,
        "diastolic": 73,
        "mean": 85.3
      },
      "P95": {
        "systolic": 115,
        "diastolic": 76,
        "mean": 89.0
      },
      "P95Plus12": {
        "systolic": 127,
        "diastolic": 88,
        "mean": 101.0
      }
    }
  },
  {
    "id": "10anos-masculino",
    "label": "10 anos",
    "ageDays": 3652.5,
    "ageYears": 10,
    "heightP50Cm": 141.3,
    "fcLow": 60,
    "fcHigh": 130,
    "frHigh": 18,
    "lowerPercentilesEstimated": true,
    "percentiles": {
      "P5": {
        "systolic": 84,
        "diastolic": 47,
        "mean": 59.3
      },
      "P10": {
        "systolic": 88,
        "diastolic": 50,
        "mean": 62.7
      },
      "P50": {
        "systolic": 100,
        "diastolic": 62,
        "mean": 74.7
      },
      "P90": {
        "systolic": 112,
        "diastolic": 74,
        "mean": 86.7
      },
      "P95": {
        "systolic": 116,
        "diastolic": 77,
        "mean": 90.0
      },
      "P95Plus12": {
        "systolic": 128,
        "diastolic": 89,
        "mean": 102.0
      }
    }
  },
  {
    "id": "11anos-masculino",
    "label": "11 anos",
    "ageDays": 4017.75,
    "ageYears": 11,
    "heightP50Cm": 146.4,
    "fcLow": 60,
    "fcHigh": 130,
    "frHigh": 18,
    "lowerPercentilesEstimated": true,
    "percentiles": {
      "P5": {
        "systolic": 86,
        "diastolic": 48,
        "mean": 60.7
      },
      "P10": {
        "systolic": 90,
        "diastolic": 51,
        "mean": 64.0
      },
      "P50": {
        "systolic": 102,
        "diastolic": 63,
        "mean": 76.0
      },
      "P90": {
        "systolic": 114,
        "diastolic": 75,
        "mean": 88.0
      },
      "P95": {
        "systolic": 118,
        "diastolic": 78,
        "mean": 91.3
      },
      "P95Plus12": {
        "systolic": 130,
        "diastolic": 90,
        "mean": 103.3
      }
    }
  },
  {
    "id": "12anos-masculino",
    "label": "12 anos",
    "ageDays": 4383.0,
    "ageYears": 12,
    "heightP50Cm": 152.7,
    "fcLow": 60,
    "fcHigh": 130,
    "frHigh": 18,
    "lowerPercentilesEstimated": true,
    "percentiles": {
      "P5": {
        "systolic": 87,
        "diastolic": 46,
        "mean": 59.7
      },
      "P10": {
        "systolic": 91,
        "diastolic": 49,
        "mean": 63.0
      },
      "P50": {
        "systolic": 104,
        "diastolic": 62,
        "mean": 76.0
      },
      "P90": {
        "systolic": 117,
        "diastolic": 75,
        "mean": 89.0
      },
      "P95": {
        "systolic": 121,
        "diastolic": 78,
        "mean": 92.3
      },
      "P95Plus12": {
        "systolic": 133,
        "diastolic": 90,
        "mean": 104.3
      }
    }
  },
  {
    "id": "13anos-masculino",
    "label": "13 anos",
    "ageDays": 4748.25,
    "ageYears": 13,
    "heightP50Cm": 160.3,
    "fcLow": 60,
    "fcHigh": 110,
    "frHigh": 14,
    "lowerPercentilesEstimated": true,
    "percentiles": {
      "P5": {
        "systolic": 91,
        "diastolic": 46,
        "mean": 61.0
      },
      "P10": {
        "systolic": 95,
        "diastolic": 49,
        "mean": 64.3
      },
      "P50": {
        "systolic": 108,
        "diastolic": 62,
        "mean": 77.3
      },
      "P90": {
        "systolic": 121,
        "diastolic": 75,
        "mean": 90.3
      },
      "P95": {
        "systolic": 125,
        "diastolic": 78,
        "mean": 93.7
      },
      "P95Plus12": {
        "systolic": 137,
        "diastolic": 90,
        "mean": 105.7
      }
    }
  },
  {
    "id": "14anos-masculino",
    "label": "14 anos",
    "ageDays": 5113.5,
    "ageYears": 14,
    "heightP50Cm": 167.5,
    "fcLow": 60,
    "fcHigh": 110,
    "frHigh": 14,
    "lowerPercentilesEstimated": true,
    "percentiles": {
      "P5": {
        "systolic": 92,
        "diastolic": 47,
        "mean": 62.0
      },
      "P10": {
        "systolic": 96,
        "diastolic": 51,
        "mean": 66.0
      },
      "P50": {
        "systolic": 111,
        "diastolic": 64,
        "mean": 79.7
      },
      "P90": {
        "systolic": 126,
        "diastolic": 77,
        "mean": 93.3
      },
      "P95": {
        "systolic": 130,
        "diastolic": 81,
        "mean": 97.3
      },
      "P95Plus12": {
        "systolic": 142,
        "diastolic": 93,
        "mean": 109.3
      }
    }
  },
  {
    "id": "15anos-masculino",
    "label": "15 anos",
    "ageDays": 5478.75,
    "ageYears": 15,
    "heightP50Cm": 172.2,
    "fcLow": 60,
    "fcHigh": 110,
    "frHigh": 14,
    "lowerPercentilesEstimated": true,
    "percentiles": {
      "P5": {
        "systolic": 94,
        "diastolic": 47,
        "mean": 62.7
      },
      "P10": {
        "systolic": 98,
        "diastolic": 51,
        "mean": 66.7
      },
      "P50": {
        "systolic": 113,
        "diastolic": 65,
        "mean": 81.0
      },
      "P90": {
        "systolic": 128,
        "diastolic": 79,
        "mean": 95.3
      },
      "P95": {
        "systolic": 132,
        "diastolic": 83,
        "mean": 99.3
      },
      "P95Plus12": {
        "systolic": 144,
        "diastolic": 95,
        "mean": 111.3
      }
    }
  },
  {
    "id": "16anos-masculino",
    "label": "16 anos",
    "ageDays": 5844.0,
    "ageYears": 16,
    "heightP50Cm": 174.6,
    "fcLow": 60,
    "fcHigh": 110,
    "frHigh": 14,
    "lowerPercentilesEstimated": true,
    "percentiles": {
      "P5": {
        "systolic": 96,
        "diastolic": 50,
        "mean": 65.3
      },
      "P10": {
        "systolic": 101,
        "diastolic": 54,
        "mean": 69.7
      },
      "P50": {
        "systolic": 115,
        "diastolic": 67,
        "mean": 83.0
      },
      "P90": {
        "systolic": 129,
        "diastolic": 80,
        "mean": 96.3
      },
      "P95": {
        "systolic": 134,
        "diastolic": 84,
        "mean": 100.7
      },
      "P95Plus12": {
        "systolic": 146,
        "diastolic": 96,
        "mean": 112.7
      }
    }
  },
  {
    "id": "17anos-masculino",
    "label": "17 anos",
    "ageDays": 6209.25,
    "ageYears": 17,
    "heightP50Cm": 175.8,
    "fcLow": 60,
    "fcHigh": 110,
    "frHigh": 14,
    "lowerPercentilesEstimated": true,
    "percentiles": {
      "P5": {
        "systolic": 99,
        "diastolic": 51,
        "mean": 67.0
      },
      "P10": {
        "systolic": 103,
        "diastolic": 55,
        "mean": 71.0
      },
      "P50": {
        "systolic": 117,
        "diastolic": 68,
        "mean": 84.3
      },
      "P90": {
        "systolic": 131,
        "diastolic": 81,
        "mean": 97.7
      },
      "P95": {
        "systolic": 135,
        "diastolic": 85,
        "mean": 101.7
      },
      "P95Plus12": {
        "systolic": 147,
        "diastolic": 97,
        "mean": 113.7
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
    "heightP50Cm": 80.8,
    "fcLow": 90,
    "fcHigh": 180,
    "frHigh": 34,
    "lowerPercentilesEstimated": true,
    "percentiles": {
      "P5": {
        "systolic": 69,
        "diastolic": 26,
        "mean": 40.3
      },
      "P10": {
        "systolic": 72,
        "diastolic": 30,
        "mean": 44.0
      },
      "P50": {
        "systolic": 86,
        "diastolic": 43,
        "mean": 57.3
      },
      "P90": {
        "systolic": 100,
        "diastolic": 56,
        "mean": 70.7
      },
      "P95": {
        "systolic": 103,
        "diastolic": 60,
        "mean": 74.3
      },
      "P95Plus12": {
        "systolic": 115,
        "diastolic": 72,
        "mean": 86.3
      }
    }
  },
  {
    "id": "2anos-feminino",
    "label": "2 anos",
    "ageDays": 730.5,
    "ageYears": 2,
    "heightP50Cm": 91.1,
    "fcLow": 100,
    "fcHigh": 140,
    "frHigh": 22,
    "lowerPercentilesEstimated": true,
    "percentiles": {
      "P5": {
        "systolic": 72,
        "diastolic": 32,
        "mean": 45.3
      },
      "P10": {
        "systolic": 75,
        "diastolic": 36,
        "mean": 49.0
      },
      "P50": {
        "systolic": 89,
        "diastolic": 48,
        "mean": 61.7
      },
      "P90": {
        "systolic": 103,
        "diastolic": 60,
        "mean": 74.3
      },
      "P95": {
        "systolic": 106,
        "diastolic": 64,
        "mean": 78.0
      },
      "P95Plus12": {
        "systolic": 118,
        "diastolic": 76,
        "mean": 90.0
      }
    }
  },
  {
    "id": "3anos-feminino",
    "label": "3 anos",
    "ageDays": 1095.75,
    "ageYears": 3,
    "heightP50Cm": 97.6,
    "fcLow": 100,
    "fcHigh": 140,
    "frHigh": 22,
    "lowerPercentilesEstimated": true,
    "percentiles": {
      "P5": {
        "systolic": 72,
        "diastolic": 34,
        "mean": 46.7
      },
      "P10": {
        "systolic": 76,
        "diastolic": 38,
        "mean": 50.7
      },
      "P50": {
        "systolic": 90,
        "diastolic": 50,
        "mean": 63.3
      },
      "P90": {
        "systolic": 104,
        "diastolic": 62,
        "mean": 76.0
      },
      "P95": {
        "systolic": 108,
        "diastolic": 66,
        "mean": 80.0
      },
      "P95Plus12": {
        "systolic": 120,
        "diastolic": 78,
        "mean": 92.0
      }
    }
  },
  {
    "id": "4anos-feminino",
    "label": "4 anos",
    "ageDays": 1461.0,
    "ageYears": 4,
    "heightP50Cm": 104.5,
    "fcLow": 100,
    "fcHigh": 140,
    "frHigh": 22,
    "lowerPercentilesEstimated": true,
    "percentiles": {
      "P5": {
        "systolic": 75,
        "diastolic": 37,
        "mean": 49.7
      },
      "P10": {
        "systolic": 78,
        "diastolic": 41,
        "mean": 53.3
      },
      "P50": {
        "systolic": 92,
        "diastolic": 53,
        "mean": 66.0
      },
      "P90": {
        "systolic": 106,
        "diastolic": 65,
        "mean": 78.7
      },
      "P95": {
        "systolic": 109,
        "diastolic": 69,
        "mean": 82.3
      },
      "P95Plus12": {
        "systolic": 121,
        "diastolic": 81,
        "mean": 94.3
      }
    }
  },
  {
    "id": "5anos-feminino",
    "label": "5 anos",
    "ageDays": 1826.25,
    "ageYears": 5,
    "heightP50Cm": 111.5,
    "fcLow": 100,
    "fcHigh": 140,
    "frHigh": 22,
    "lowerPercentilesEstimated": true,
    "percentiles": {
      "P5": {
        "systolic": 76,
        "diastolic": 39,
        "mean": 51.3
      },
      "P10": {
        "systolic": 79,
        "diastolic": 43,
        "mean": 55.0
      },
      "P50": {
        "systolic": 93,
        "diastolic": 55,
        "mean": 67.7
      },
      "P90": {
        "systolic": 107,
        "diastolic": 67,
        "mean": 80.3
      },
      "P95": {
        "systolic": 110,
        "diastolic": 71,
        "mean": 84.0
      },
      "P95Plus12": {
        "systolic": 122,
        "diastolic": 83,
        "mean": 96.0
      }
    }
  },
  {
    "id": "6anos-feminino",
    "label": "6 anos",
    "ageDays": 2191.5,
    "ageYears": 6,
    "heightP50Cm": 118.4,
    "fcLow": 60,
    "fcHigh": 130,
    "frHigh": 18,
    "lowerPercentilesEstimated": true,
    "percentiles": {
      "P5": {
        "systolic": 77,
        "diastolic": 40,
        "mean": 52.3
      },
      "P10": {
        "systolic": 80,
        "diastolic": 43,
        "mean": 55.3
      },
      "P50": {
        "systolic": 94,
        "diastolic": 56,
        "mean": 68.7
      },
      "P90": {
        "systolic": 108,
        "diastolic": 69,
        "mean": 82.0
      },
      "P95": {
        "systolic": 111,
        "diastolic": 72,
        "mean": 85.0
      },
      "P95Plus12": {
        "systolic": 123,
        "diastolic": 84,
        "mean": 97.0
      }
    }
  },
  {
    "id": "7anos-feminino",
    "label": "7 anos",
    "ageDays": 2556.75,
    "ageYears": 7,
    "heightP50Cm": 124.9,
    "fcLow": 60,
    "fcHigh": 130,
    "frHigh": 18,
    "lowerPercentilesEstimated": true,
    "percentiles": {
      "P5": {
        "systolic": 78,
        "diastolic": 41,
        "mean": 53.3
      },
      "P10": {
        "systolic": 81,
        "diastolic": 44,
        "mean": 56.3
      },
      "P50": {
        "systolic": 95,
        "diastolic": 57,
        "mean": 69.7
      },
      "P90": {
        "systolic": 109,
        "diastolic": 70,
        "mean": 83.0
      },
      "P95": {
        "systolic": 112,
        "diastolic": 73,
        "mean": 86.0
      },
      "P95Plus12": {
        "systolic": 124,
        "diastolic": 85,
        "mean": 98.0
      }
    }
  },
  {
    "id": "8anos-feminino",
    "label": "8 anos",
    "ageDays": 2922.0,
    "ageYears": 8,
    "heightP50Cm": 130.6,
    "fcLow": 60,
    "fcHigh": 130,
    "frHigh": 18,
    "lowerPercentilesEstimated": true,
    "percentiles": {
      "P5": {
        "systolic": 81,
        "diastolic": 44,
        "mean": 56.3
      },
      "P10": {
        "systolic": 84,
        "diastolic": 46,
        "mean": 58.7
      },
      "P50": {
        "systolic": 97,
        "diastolic": 59,
        "mean": 71.7
      },
      "P90": {
        "systolic": 110,
        "diastolic": 72,
        "mean": 84.7
      },
      "P95": {
        "systolic": 113,
        "diastolic": 74,
        "mean": 87.0
      },
      "P95Plus12": {
        "systolic": 125,
        "diastolic": 86,
        "mean": 99.0
      }
    }
  },
  {
    "id": "9anos-feminino",
    "label": "9 anos",
    "ageDays": 3287.25,
    "ageYears": 9,
    "heightP50Cm": 135.6,
    "fcLow": 60,
    "fcHigh": 130,
    "frHigh": 18,
    "lowerPercentilesEstimated": true,
    "percentiles": {
      "P5": {
        "systolic": 82,
        "diastolic": 45,
        "mean": 57.3
      },
      "P10": {
        "systolic": 85,
        "diastolic": 47,
        "mean": 59.7
      },
      "P50": {
        "systolic": 98,
        "diastolic": 60,
        "mean": 72.7
      },
      "P90": {
        "systolic": 111,
        "diastolic": 73,
        "mean": 85.7
      },
      "P95": {
        "systolic": 114,
        "diastolic": 75,
        "mean": 88.0
      },
      "P95Plus12": {
        "systolic": 126,
        "diastolic": 87,
        "mean": 100.0
      }
    }
  },
  {
    "id": "10anos-feminino",
    "label": "10 anos",
    "ageDays": 3652.5,
    "ageYears": 10,
    "heightP50Cm": 141.0,
    "fcLow": 60,
    "fcHigh": 130,
    "frHigh": 18,
    "lowerPercentilesEstimated": true,
    "percentiles": {
      "P5": {
        "systolic": 82,
        "diastolic": 44,
        "mean": 56.7
      },
      "P10": {
        "systolic": 86,
        "diastolic": 47,
        "mean": 60.0
      },
      "P50": {
        "systolic": 99,
        "diastolic": 60,
        "mean": 73.0
      },
      "P90": {
        "systolic": 112,
        "diastolic": 73,
        "mean": 86.0
      },
      "P95": {
        "systolic": 116,
        "diastolic": 76,
        "mean": 89.3
      },
      "P95Plus12": {
        "systolic": 128,
        "diastolic": 88,
        "mean": 101.3
      }
    }
  },
  {
    "id": "11anos-feminino",
    "label": "11 anos",
    "ageDays": 4017.75,
    "ageYears": 11,
    "heightP50Cm": 147.8,
    "fcLow": 60,
    "fcHigh": 130,
    "frHigh": 18,
    "lowerPercentilesEstimated": true,
    "percentiles": {
      "P5": {
        "systolic": 86,
        "diastolic": 45,
        "mean": 58.7
      },
      "P10": {
        "systolic": 90,
        "diastolic": 48,
        "mean": 62.0
      },
      "P50": {
        "systolic": 102,
        "diastolic": 61,
        "mean": 74.7
      },
      "P90": {
        "systolic": 114,
        "diastolic": 74,
        "mean": 87.3
      },
      "P95": {
        "systolic": 118,
        "diastolic": 77,
        "mean": 90.7
      },
      "P95Plus12": {
        "systolic": 130,
        "diastolic": 89,
        "mean": 102.7
      }
    }
  },
  {
    "id": "12anos-feminino",
    "label": "12 anos",
    "ageDays": 4383.0,
    "ageYears": 12,
    "heightP50Cm": 154.8,
    "fcLow": 60,
    "fcHigh": 130,
    "frHigh": 18,
    "lowerPercentilesEstimated": true,
    "percentiles": {
      "P5": {
        "systolic": 88,
        "diastolic": 46,
        "mean": 60.0
      },
      "P10": {
        "systolic": 92,
        "diastolic": 49,
        "mean": 63.3
      },
      "P50": {
        "systolic": 105,
        "diastolic": 62,
        "mean": 76.3
      },
      "P90": {
        "systolic": 118,
        "diastolic": 75,
        "mean": 89.3
      },
      "P95": {
        "systolic": 122,
        "diastolic": 78,
        "mean": 92.7
      },
      "P95Plus12": {
        "systolic": 134,
        "diastolic": 90,
        "mean": 104.7
      }
    }
  },
  {
    "id": "13anos-feminino",
    "label": "13 anos",
    "ageDays": 4748.25,
    "ageYears": 13,
    "heightP50Cm": 159.2,
    "fcLow": 60,
    "fcHigh": 110,
    "frHigh": 14,
    "lowerPercentilesEstimated": true,
    "percentiles": {
      "P5": {
        "systolic": 90,
        "diastolic": 49,
        "mean": 62.7
      },
      "P10": {
        "systolic": 93,
        "diastolic": 52,
        "mean": 65.7
      },
      "P50": {
        "systolic": 107,
        "diastolic": 64,
        "mean": 78.3
      },
      "P90": {
        "systolic": 121,
        "diastolic": 76,
        "mean": 91.0
      },
      "P95": {
        "systolic": 124,
        "diastolic": 79,
        "mean": 94.0
      },
      "P95Plus12": {
        "systolic": 136,
        "diastolic": 91,
        "mean": 106.0
      }
    }
  },
  {
    "id": "14anos-feminino",
    "label": "14 anos",
    "ageDays": 5113.5,
    "ageYears": 14,
    "heightP50Cm": 161.3,
    "fcLow": 60,
    "fcHigh": 110,
    "frHigh": 14,
    "lowerPercentilesEstimated": true,
    "percentiles": {
      "P5": {
        "systolic": 91,
        "diastolic": 50,
        "mean": 63.7
      },
      "P10": {
        "systolic": 94,
        "diastolic": 54,
        "mean": 67.3
      },
      "P50": {
        "systolic": 108,
        "diastolic": 65,
        "mean": 79.3
      },
      "P90": {
        "systolic": 122,
        "diastolic": 76,
        "mean": 91.3
      },
      "P95": {
        "systolic": 125,
        "diastolic": 80,
        "mean": 95.0
      },
      "P95Plus12": {
        "systolic": 137,
        "diastolic": 92,
        "mean": 107.0
      }
    }
  },
  {
    "id": "15anos-feminino",
    "label": "15 anos",
    "ageDays": 5478.75,
    "ageYears": 15,
    "heightP50Cm": 162.3,
    "fcLow": 60,
    "fcHigh": 110,
    "frHigh": 14,
    "lowerPercentilesEstimated": true,
    "percentiles": {
      "P5": {
        "systolic": 90,
        "diastolic": 49,
        "mean": 62.7
      },
      "P10": {
        "systolic": 94,
        "diastolic": 53,
        "mean": 66.7
      },
      "P50": {
        "systolic": 108,
        "diastolic": 65,
        "mean": 79.3
      },
      "P90": {
        "systolic": 122,
        "diastolic": 77,
        "mean": 92.0
      },
      "P95": {
        "systolic": 126,
        "diastolic": 81,
        "mean": 96.0
      },
      "P95Plus12": {
        "systolic": 138,
        "diastolic": 93,
        "mean": 108.0
      }
    }
  },
  {
    "id": "16anos-feminino",
    "label": "16 anos",
    "ageDays": 5844.0,
    "ageYears": 16,
    "heightP50Cm": 162.8,
    "fcLow": 60,
    "fcHigh": 110,
    "frHigh": 14,
    "lowerPercentilesEstimated": true,
    "percentiles": {
      "P5": {
        "systolic": 91,
        "diastolic": 51,
        "mean": 64.3
      },
      "P10": {
        "systolic": 95,
        "diastolic": 55,
        "mean": 68.3
      },
      "P50": {
        "systolic": 109,
        "diastolic": 66,
        "mean": 80.3
      },
      "P90": {
        "systolic": 123,
        "diastolic": 77,
        "mean": 92.3
      },
      "P95": {
        "systolic": 127,
        "diastolic": 81,
        "mean": 96.3
      },
      "P95Plus12": {
        "systolic": 139,
        "diastolic": 93,
        "mean": 108.3
      }
    }
  },
  {
    "id": "17anos-feminino",
    "label": "17 anos",
    "ageDays": 6209.25,
    "ageYears": 17,
    "heightP50Cm": 163.0,
    "fcLow": 60,
    "fcHigh": 110,
    "frHigh": 14,
    "lowerPercentilesEstimated": true,
    "percentiles": {
      "P5": {
        "systolic": 93,
        "diastolic": 51,
        "mean": 65.0
      },
      "P10": {
        "systolic": 96,
        "diastolic": 55,
        "mean": 68.7
      },
      "P50": {
        "systolic": 110,
        "diastolic": 66,
        "mean": 80.7
      },
      "P90": {
        "systolic": 124,
        "diastolic": 77,
        "mean": 92.7
      },
      "P95": {
        "systolic": 127,
        "diastolic": 81,
        "mean": 96.3
      },
      "P95Plus12": {
        "systolic": 139,
        "diastolic": 93,
        "mean": 108.3
      }
    }
  }
];

