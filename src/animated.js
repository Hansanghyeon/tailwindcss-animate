
function filterDefault(values) {
  return Object.fromEntries(
    Object.entries(values).filter(([key]) => key !== "DEFAULT"),
  )
}

module.exports = ({ addUtilities, matchUtilities, theme }) => {
  addUtilities({
    "@keyframes enter": theme("keyframes.enter"),
    "@keyframes exit": theme("keyframes.exit"),
    "@keyframes enter-bottom-center": theme("keyframes.enter-bottom-center"),
    "@keyframes exit-bottom-center": theme("keyframes.exit-bottom-center"),
    "@keyframes enter-right": theme("keyframes.enter-right"),
    "@keyframes exit-right": theme("keyframes.exit-right"),
    ".animate-in": {
      animationName: "enter",
      animationDuration: theme("animationDuration.DEFAULT"),
      "--tw-enter-opacity": "initial",
      "--tw-enter-scale": "initial",
      "--tw-enter-rotate": "initial",
      "--tw-enter-translate-x": "initial",
      "--tw-enter-translate-y": "initial",
    },
    ".animate-out": {
      animationName: "exit",
      animationDuration: theme("animationDuration.DEFAULT"),
      "--tw-exit-opacity": "initial",
      "--tw-exit-scale": "initial",
      "--tw-exit-rotate": "initial",
      "--tw-exit-translate-x": "initial",
      "--tw-exit-translate-y": "initial",
    },
    ".animate-in-bottom-center": {
      animationName: "enter-bottom-center",
      animationDuration: theme("animationDuration.DEFAULT"),
      animationFillMode: "forwards",
      "--tw-enter-opacity": "initial",
      "--tw-enter-scale": "initial",
      "--tw-enter-rotate": "initial",
      "--tw-enter-translate-x": "-50%",
      "--tw-enter-translate-y": "initial",
    },
    ".animate-out-bottom-center": {
      animationName: "exit-bottom-center",
      animationDuration: theme("animationDuration.DEFAULT"),
      animationFillMode: "forwards",
      "--tw-exit-opacity": "initial",
      "--tw-exit-scale": "initial",
      "--tw-exit-rotate": "initial",
      "--tw-exit-translate-x": "-50%",
      "--tw-exit-translate-y": "initial",
    },
    ".animate-in-right": {
      animationName: "enter-right",
      animationDuration: theme("animationDuration.DEFAULT"),
      "--tw-enter-opacity": "initial",
      "--tw-enter-scale": "initial",
      "--tw-enter-rotate": "initial",
      "--tw-enter-translate-x": "initial",
      "--tw-enter-translate-y": "initial",
    },
    ".animate-out-right": {
      animationName: "exit-right",
      animationDuration: theme("animationDuration.DEFAULT"),
      "--tw-enter-opacity": "initial",
      "--tw-enter-scale": "initial",
      "--tw-enter-rotate": "initial",
      "--tw-enter-translate-x": "initial",
      "--tw-enter-translate-y": "initial",
    },
  })

  matchUtilities(
    {
      "fade-in": (value) => ({ "--tw-enter-opacity": value }),
      "fade-out": (value) => ({ "--tw-exit-opacity": value }),
    },
    { values: theme("animationOpacity") },
  )

  matchUtilities(
    {
      "zoom-in": (value) => ({ "--tw-enter-scale": value }),
      "zoom-out": (value) => ({ "--tw-exit-scale": value }),
    },
    { values: theme("animationScale") },
  )

  matchUtilities(
    {
      "spin-in": (value) => ({ "--tw-enter-rotate": value }),
      "spin-out": (value) => ({ "--tw-exit-rotate": value }),
    },
    { values: theme("animationRotate") },
  )

  matchUtilities(
    {
      "slide-in-from-top": (value) => ({
        "--tw-enter-translate-y": `-${value}`,
      }),
      "slide-in-from-bottom": (value) => ({
        "--tw-enter-translate-y": value,
      }),
      "slide-in-from-left": (value) => ({
        "--tw-enter-translate-x": `-${value}`,
      }),
      "slide-in-from-right": (value) => ({
        "--tw-enter-translate-x": value,
      }),
      "slide-out-to-top": (value) => ({
        "--tw-exit-translate-y": `-${value}`,
      }),
      "slide-out-to-bottom": (value) => ({
        "--tw-exit-translate-y": value,
      }),
      "slide-out-to-left": (value) => ({
        "--tw-exit-translate-x": `-${value}`,
      }),
      "slide-out-to-right": (value) => ({
        "--tw-exit-translate-x": value,
      }),
    },
    { values: theme("animationTranslate") },
  )

  matchUtilities(
    { duration: (value) => ({ animationDuration: value }) },
    { values: filterDefault(theme("animationDuration")) },
  )

  matchUtilities(
    { delay: (value) => ({ animationDelay: value }) },
    { values: theme("animationDelay") },
  )

  matchUtilities(
    { ease: (value) => ({ animationTimingFunction: value }) },
    { values: filterDefault(theme("animationTimingFunction")) },
  )

  addUtilities({
    ".running": { animationPlayState: "running" },
    ".paused": { animationPlayState: "paused" },
  })

  matchUtilities(
    { "fill-mode": (value) => ({ animationFillMode: value }) },
    { values: theme("animationFillMode") },
  )

  matchUtilities(
    { direction: (value) => ({ animationDirection: value }) },
    { values: theme("animationDirection") },
  )

  matchUtilities(
    { repeat: (value) => ({ animationIterationCount: value }) },
    { values: theme("animationRepeat") },
  )
},
{
  theme: {
    extend: {
      animationDelay: ({ theme }) => ({
        ...theme("transitionDelay"),
      }),
      animationDuration: ({ theme }) => ({
        0: "0ms",
        ...theme("transitionDuration"),
      }),
      animationTimingFunction: ({ theme }) => ({
        ...theme("transitionTimingFunction"),
      }),
      animationFillMode: {
        none: "none",
        forwards: "forwards",
        backwards: "backwards",
        both: "both",
      },
      animationDirection: {
        normal: "normal",
        reverse: "reverse",
        alternate: "alternate",
        "alternate-reverse": "alternate-reverse",
      },
      animationOpacity: ({ theme }) => ({
        DEFAULT: 0,
        ...theme("opacity"),
      }),
      animationTranslate: ({ theme }) => ({
        DEFAULT: "100%",
        ...theme("translate"),
      }),
      animationScale: ({ theme }) => ({
        DEFAULT: 0,
        ...theme("scale"),
      }),
      animationRotate: ({ theme }) => ({
        DEFAULT: "30deg",
        ...theme("rotate"),
      }),
      animationRepeat: {
        0: "0",
        1: "1",
        infinite: "infinite",
      },
      keyframes: {
        enter: {
          from: {
            opacity: "var(--tw-enter-opacity, 1)",
            transform:
              "translate3d(var(--tw-enter-translate-x, 0), var(--tw-enter-translate-y, 0), 0) scale3d(var(--tw-enter-scale, 1), var(--tw-enter-scale, 1), var(--tw-enter-scale, 1)) rotate(var(--tw-enter-rotate, 0))",
          },
        },
        exit: {
          to: {
            opacity: "var(--tw-exit-opacity, 1)",
            transform:
              "translate3d(var(--tw-exit-translate-x, 0), var(--tw-exit-translate-y, 0), 0) scale3d(var(--tw-exit-scale, 1), var(--tw-exit-scale, 1), var(--tw-exit-scale, 1)) rotate(var(--tw-exit-rotate, 0))",
          },
        },
        'enter-bottom-center': {
          from: {
            opacity: "var(--tw-enter-opacity, 1)",
            transform:
              "translate3d(var(--tw-enter-translate-x, -50%), var(--tw-enter-translate-y, 100%), 0) scale3d(var(--tw-enter-scale, 1), var(--tw-enter-scale, 1), var(--tw-enter-scale, 1)) rotate(var(--tw-enter-rotate, 0))",
          },
          to: {
            opacity: "var(--tw-enter-opacity, 1)",
            transform:
              "translate3d(var(--tw-enter-translate-x, -50%), var(--tw-enter-translate-y, 0%), 0) scale3d(var(--tw-enter-scale, 1), var(--tw-enter-scale, 1), var(--tw-enter-scale, 1)) rotate(var(--tw-enter-rotate, 0))",
          },
        },
        'exit-bottom-center': {
          from: {
            opacity: "var(--tw-exit-opacity, 1)",
            transform:
              "translate3d(var(--tw-exit-translate-x, -50%), var(--tw-exit-translate-y, 0%), 0) scale3d(var(--tw-exit-scale, 1), var(--tw-exit-scale, 1), var(--tw-exit-scale, 1)) rotate(var(--tw-exit-rotate, 0))",
          },
          to: {
            opacity: "var(--tw-exit-opacity, 1)",
            transform:
              "translate3d(var(--tw-exit-translate-x, -50%), var(--tw-exit-translate-y, 100%), 0) scale3d(var(--tw-exit-scale, 1), var(--tw-exit-scale, 1), var(--tw-exit-scale, 1)) rotate(var(--tw-exit-rotate, 0))",
          },
        },
        'enter-right': {
          from: {
            opacity: "var(--tw-enter-opacity, 1)",
            transform:
              "translate3d(var(--tw-enter-translate-x, 100%), var(--tw-enter-translate-y, 0), 0) scale3d(var(--tw-enter-scale, 1), var(--tw-enter-scale, 1), var(--tw-enter-scale, 1)) rotate(var(--tw-enter-rotate, 0))",
          },
        },
        'exit-right': {
          to: {
            opacity: "var(--tw-enter-opacity, 1)",
            transform:
              "translate3d(var(--tw-exit-translate-x, 100%), var(--tw-exit-translate-y, 0), 0) scale3d(var(--tw-exit-scale, 1), var(--tw-exit-scale, 1), var(--tw-exit-scale, 1)) rotate(var(--tw-exit-rotate, 0))",
          },
        },
      },
    },
  },
}