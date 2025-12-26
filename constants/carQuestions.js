export const carQuestions = [
    {
        "carId": 1,
        "carName": "Ferrari F8 Tributo",
        "questions": [
            {
                "id": 101,
                "question": "Quel type de moteur équipe la Ferrari F8 Tributo ?",
                "answers": [
                    { "reponse": "V8 biturbo", "isCorrect": true },
                    { "reponse": "V12 atmosphérique", "isCorrect": false },
                    { "reponse": "V6 hybride", "isCorrect": false },
                    { "reponse": "4 cylindres turbo", "isCorrect": false }
                ]
            },
            {
                "id": 102,
                "question": "Quelle est la puissance de la Ferrari F8 Tributo ?",
                "answers": [
                    { "reponse": "720 chevaux", "isCorrect": true },
                    { "reponse": "560 chevaux", "isCorrect": false },
                    { "reponse": "800 chevaux", "isCorrect": false },
                    { "reponse": "650 chevaux", "isCorrect": false }
                ]
            },
            {
                "id": 103,
                "question": "Quel est le 0-100 km/h de la F8 Tributo ?",
                "answers": [
                    { "reponse": "2.9 secondes", "isCorrect": true },
                    { "reponse": "4.1 secondes", "isCorrect": false },
                    { "reponse": "3.8 secondes", "isCorrect": false },
                    { "reponse": "5.0 secondes", "isCorrect": false }
                ]
            },
            {
                "id": 104,
                "question": "Quel est le poids approximatif de la F8 Tributo ?",
                "answers": [
                    { "reponse": "1330 kg", "isCorrect": true },
                    { "reponse": "1600 kg", "isCorrect": false },
                    { "reponse": "1900 kg", "isCorrect": false },
                    { "reponse": "1100 kg", "isCorrect": false }
                ]
            },
            {
                "id": 105,
                "question": "La Ferrari F8 Tributo est une évolution de quel modèle ?",
                "answers": [
                    { "reponse": "Ferrari 488 GTB", "isCorrect": true },
                    { "reponse": "Ferrari 458 Italia", "isCorrect": false },
                    { "reponse": "Ferrari California", "isCorrect": false },
                    { "reponse": "Ferrari F12", "isCorrect": false }
                ]
            }
        ]
    },

    {
        "carId": 2,
        "carName": "Lamborghini Huracán EVO",
        "questions": [
            {
                "id": 201,
                "question": "Quel moteur équipe la Huracán EVO ?",
                "answers": [
                    { "reponse": "V10 atmosphérique", "isCorrect": true },
                    { "reponse": "V8 biturbo", "isCorrect": false },
                    { "reponse": "V12 hybride", "isCorrect": false },
                    { "reponse": "V6 turbo", "isCorrect": false }
                ]
            },
            {
                "id": 202,
                "question": "Quelle est la puissance de la Huracán EVO ?",
                "answers": [
                    { "reponse": "640 chevaux", "isCorrect": true },
                    { "reponse": "500 chevaux", "isCorrect": false },
                    { "reponse": "720 chevaux", "isCorrect": false },
                    { "reponse": "580 chevaux", "isCorrect": false }
                ]
            },
            {
                "id": 203,
                "question": "Quel système améliore la maniabilité de la Huracán EVO ?",
                "answers": [
                    { "reponse": "Direction arrière active", "isCorrect": true },
                    { "reponse": "Suspension pneumatique", "isCorrect": false },
                    { "reponse": "Transmission hybride", "isCorrect": false },
                    { "reponse": "Freinage régénératif", "isCorrect": false }
                ]
            },
            {
                "id": 204,
                "question": "Quel est le 0-100 km/h de la Huracán EVO ?",
                "answers": [
                    { "reponse": "2.9 secondes", "isCorrect": true },
                    { "reponse": "4.0 secondes", "isCorrect": false },
                    { "reponse": "3.5 secondes", "isCorrect": false },
                    { "reponse": "5.2 secondes", "isCorrect": false }
                ]
            },
            {
                "id": 205,
                "question": "Quel est le type de transmission de la Huracán EVO ?",
                "answers": [
                    { "reponse": "4 roues motrices", "isCorrect": true },
                    { "reponse": "Propulsion", "isCorrect": false },
                    { "reponse": "Traction avant", "isCorrect": false },
                    { "reponse": "Transmission hybride", "isCorrect": false }
                ]
            }
        ]
    }
];

export const motorQuestions = [
    {
        link:"../app/(tabs)/games/images/hellcat_motot.png",
        responses: [
          {
              userResponse:"V8",
                isCorrect: true
          },
          {
            userResponse:"V6",
            isCorrect: false
          },
          {
            userResponse:"V10",
            isCorrect: false
          },
          {
            userResponse:"V12",
            isCorrect: false
          },
          {
            userResponse:"Inline 6",
            isCorrect: false
          }

        ]
        
    },
    {
        responses: [
            {
                userResponse:"V8",
                isCorrect: false
            },
            {
                userResponse:"V6",
                isCorrect: true
            },
            {
                userResponse:"V10",
                isCorrect: false
            },
            {
                userResponse:"V12",
                isCorrect: false
            },
            {
                userResponse:"Inline 6",
                isCorrect: false
            }
        ]
    },
    {
        responses: [
            {
                userResponse:"V8",
                isCorrect: false
            },
            {
                userResponse:"V6",
                isCorrect: false
            },
            {
                userResponse:"V10",
                isCorrect: true
            },
            {
                userResponse:"V12",
                isCorrect: false
            },
            {
                userResponse:"Inline 6",
                isCorrect: false
            }
        ]
    },
    {
        responses:  [
            {
                userResponse:"V8",
                isCorrect: false
            },
            {
                userResponse:"V6",
                isCorrect: false

            },
            {
                userResponse:"V10",
                isCorrect: false
            },
            {
                userResponse:"V12",
                isCorrect: true
            },
            {
                userResponse:"Inline 6",
                isCorrect: false
            }

        ]
    },
    {
        responses: [
            {
                userResponse:"V8",
                isCorrect: false
            },
            {
                userResponse:"V6",
                isCorrect: false
            },
            {
                userResponse:"V10",
                isCorrect: false
            },
            {
                userResponse:"V12",
                isCorrect: false
            },
            {
                userResponse:"Inline 6",
                isCorrect: true
            }
        ]
    }
]

export const engineSounds ={
    v8: require("../app/(tabs)/games/mp3/v8.mp3"),
    v6: require("../app/(tabs)/games/mp3/v6.mp3"),
    v10:require("../app/(tabs)/games/mp3/v10.mp3"),
    v12:require("../app/(tabs)/games/mp3/v12.mp3"),
    inline6:require("../app/(tabs)/games/mp3/inline6.mp3"),
    cheering:require("../app/(tabs)/games/mp3/cheering.mp3")

}