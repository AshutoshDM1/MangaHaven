/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {

      boxShadow: {
        box: '0 0 1rem rgba(0, 0, 0, 0.3)',
      },
      height: {
        "5h": "5%",
        "6h": "6%",
        "6vh": "6vh",
        "7h": "7%",
        "8h": "8%",
        "10h": "10%",
        "15h": "15%",
        "20h": "20%",
        "30h": "30%",
        "40h": "40%",
        "50h": "50%",
        "60h": "60%",
        "70h": "70%",
        "80h": "80%",
        "90h": "90%",
        "94h": "94%",
        "95h": "95%",
        "98h": "98%",
      },
      width: {
        "10w": "10%",
        "15w": "15%",
        "20w": "20%",
        "30w": "30%",
        "40w": "40%",
        "50w": "50%",
        "60w": "60%",
        "70w": "70%",
        "80w": "80%",
        "88w": "88%",
        "90w": "90%",
        "95w": "95%",
        "98w": "98%",
        "12vw": "12vw",
        "8vw": "8vw",
        "6vw": "6vw",
        "5vw": "5vw",
        "4vw": "4vw",
        "3vw": "3vw",
        "2vw": "2vw",
        "1.5vw": "1.5vw",
        "1vw": "1vw",
        "0.5vw": "0.5vw",
        "px": "170px",
      },
      borderRadius: {
        "50r": "50px",
        "30r": "30px",
        "15r": "15px",
      },
      fontSize: {
        "0.5vh": "0.5vh",
        "1vh": "1vh",
        "1.2vw": "1.2vh",
        "1.3vh": "1.3vh",
        "1.5vh": "1.5vh",
        "1.7vh": "1.7vh",
        "2vh": "2vh",
        "2.5vh": "2.5vh",
        "3vh": "3vh",
        "4vh": "4vh",
        "5vh": "5vh",
        "8vh": "8vh",
      },
      backgroundColor  : {
        "main" : "#0f0f0f"
      },

      marginTop : {
        "10vh" : "10vh",
        "30vh" : "30vh"
      },
      gap : {
        "1vw" : "1vw",
        "2vw" : "2vw",
        "3vw" : "3vw",
        "4vw" : "4vw",
      },
      
    },
  },

}