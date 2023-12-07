/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        'roboto': ['Roboto', 'sans-serif'],
      },
      backgroundImage:{
        'no-Todo': "url('/public/img/bg-no-todo.svg')",
      },
      animation:{
        'slow-bounce': 'enterTodo 0.5s linear',
        'input-bottom':'enterTodoMore 0.5s linear',
        'input-left':'enterSubTodo 0.4s linear'
      },
      keyframes:{
        enterTodo:{
          '0%':{opacity:'0',transform:'translateY(-20%)'},
          '100%':{opacity:'1',transform:'translateY(0)'}
        },
        enterTodoMore:{
          '0%':{transform:'translateY(30%)'},
          '100%':{transform:'translateY(0)'}
        },
        enterSubTodo:{
          '0%':{transform:'translateX(-30%) scale(0.5)'},
          '100%':{transform:'translateX(0) scale(1)'}
        }
      }
    },
  },
  plugins: [require("tw-elements/dist/plugin.cjs")],
  darkMode: "class"
}