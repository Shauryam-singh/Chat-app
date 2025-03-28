import {
  require_jsx_runtime
} from "./chunk-SGVWXKAT.js";
import {
  require_react
} from "./chunk-2GK3IQSO.js";
import {
  __commonJS,
  __toESM
} from "./chunk-G3PMV62Z.js";

// node_modules/tween-functions/index.js
var require_tween_functions = __commonJS({
  "node_modules/tween-functions/index.js"(exports, module) {
    "use strict";
    var tweenFunctions = {
      linear: function(t, b, _c, d) {
        var c = _c - b;
        return c * t / d + b;
      },
      easeInQuad: function(t, b, _c, d) {
        var c = _c - b;
        return c * (t /= d) * t + b;
      },
      easeOutQuad: function(t, b, _c, d) {
        var c = _c - b;
        return -c * (t /= d) * (t - 2) + b;
      },
      easeInOutQuad: function(t, b, _c, d) {
        var c = _c - b;
        if ((t /= d / 2) < 1) {
          return c / 2 * t * t + b;
        } else {
          return -c / 2 * (--t * (t - 2) - 1) + b;
        }
      },
      easeInCubic: function(t, b, _c, d) {
        var c = _c - b;
        return c * (t /= d) * t * t + b;
      },
      easeOutCubic: function(t, b, _c, d) {
        var c = _c - b;
        return c * ((t = t / d - 1) * t * t + 1) + b;
      },
      easeInOutCubic: function(t, b, _c, d) {
        var c = _c - b;
        if ((t /= d / 2) < 1) {
          return c / 2 * t * t * t + b;
        } else {
          return c / 2 * ((t -= 2) * t * t + 2) + b;
        }
      },
      easeInQuart: function(t, b, _c, d) {
        var c = _c - b;
        return c * (t /= d) * t * t * t + b;
      },
      easeOutQuart: function(t, b, _c, d) {
        var c = _c - b;
        return -c * ((t = t / d - 1) * t * t * t - 1) + b;
      },
      easeInOutQuart: function(t, b, _c, d) {
        var c = _c - b;
        if ((t /= d / 2) < 1) {
          return c / 2 * t * t * t * t + b;
        } else {
          return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
        }
      },
      easeInQuint: function(t, b, _c, d) {
        var c = _c - b;
        return c * (t /= d) * t * t * t * t + b;
      },
      easeOutQuint: function(t, b, _c, d) {
        var c = _c - b;
        return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
      },
      easeInOutQuint: function(t, b, _c, d) {
        var c = _c - b;
        if ((t /= d / 2) < 1) {
          return c / 2 * t * t * t * t * t + b;
        } else {
          return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
        }
      },
      easeInSine: function(t, b, _c, d) {
        var c = _c - b;
        return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
      },
      easeOutSine: function(t, b, _c, d) {
        var c = _c - b;
        return c * Math.sin(t / d * (Math.PI / 2)) + b;
      },
      easeInOutSine: function(t, b, _c, d) {
        var c = _c - b;
        return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
      },
      easeInExpo: function(t, b, _c, d) {
        var c = _c - b;
        return t == 0 ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
      },
      easeOutExpo: function(t, b, _c, d) {
        var c = _c - b;
        return t == d ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
      },
      easeInOutExpo: function(t, b, _c, d) {
        var c = _c - b;
        if (t === 0) {
          return b;
        }
        if (t === d) {
          return b + c;
        }
        if ((t /= d / 2) < 1) {
          return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
        } else {
          return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
        }
      },
      easeInCirc: function(t, b, _c, d) {
        var c = _c - b;
        return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
      },
      easeOutCirc: function(t, b, _c, d) {
        var c = _c - b;
        return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
      },
      easeInOutCirc: function(t, b, _c, d) {
        var c = _c - b;
        if ((t /= d / 2) < 1) {
          return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
        } else {
          return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
        }
      },
      easeInElastic: function(t, b, _c, d) {
        var c = _c - b;
        var a, p, s;
        s = 1.70158;
        p = 0;
        a = c;
        if (t === 0) {
          return b;
        } else if ((t /= d) === 1) {
          return b + c;
        }
        if (!p) {
          p = d * 0.3;
        }
        if (a < Math.abs(c)) {
          a = c;
          s = p / 4;
        } else {
          s = p / (2 * Math.PI) * Math.asin(c / a);
        }
        return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
      },
      easeOutElastic: function(t, b, _c, d) {
        var c = _c - b;
        var a, p, s;
        s = 1.70158;
        p = 0;
        a = c;
        if (t === 0) {
          return b;
        } else if ((t /= d) === 1) {
          return b + c;
        }
        if (!p) {
          p = d * 0.3;
        }
        if (a < Math.abs(c)) {
          a = c;
          s = p / 4;
        } else {
          s = p / (2 * Math.PI) * Math.asin(c / a);
        }
        return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b;
      },
      easeInOutElastic: function(t, b, _c, d) {
        var c = _c - b;
        var a, p, s;
        s = 1.70158;
        p = 0;
        a = c;
        if (t === 0) {
          return b;
        } else if ((t /= d / 2) === 2) {
          return b + c;
        }
        if (!p) {
          p = d * (0.3 * 1.5);
        }
        if (a < Math.abs(c)) {
          a = c;
          s = p / 4;
        } else {
          s = p / (2 * Math.PI) * Math.asin(c / a);
        }
        if (t < 1) {
          return -0.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
        } else {
          return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * 0.5 + c + b;
        }
      },
      easeInBack: function(t, b, _c, d, s) {
        var c = _c - b;
        if (s === void 0) {
          s = 1.70158;
        }
        return c * (t /= d) * t * ((s + 1) * t - s) + b;
      },
      easeOutBack: function(t, b, _c, d, s) {
        var c = _c - b;
        if (s === void 0) {
          s = 1.70158;
        }
        return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
      },
      easeInOutBack: function(t, b, _c, d, s) {
        var c = _c - b;
        if (s === void 0) {
          s = 1.70158;
        }
        if ((t /= d / 2) < 1) {
          return c / 2 * (t * t * (((s *= 1.525) + 1) * t - s)) + b;
        } else {
          return c / 2 * ((t -= 2) * t * (((s *= 1.525) + 1) * t + s) + 2) + b;
        }
      },
      easeInBounce: function(t, b, _c, d) {
        var c = _c - b;
        var v;
        v = tweenFunctions.easeOutBounce(d - t, 0, c, d);
        return c - v + b;
      },
      easeOutBounce: function(t, b, _c, d) {
        var c = _c - b;
        if ((t /= d) < 1 / 2.75) {
          return c * (7.5625 * t * t) + b;
        } else if (t < 2 / 2.75) {
          return c * (7.5625 * (t -= 1.5 / 2.75) * t + 0.75) + b;
        } else if (t < 2.5 / 2.75) {
          return c * (7.5625 * (t -= 2.25 / 2.75) * t + 0.9375) + b;
        } else {
          return c * (7.5625 * (t -= 2.625 / 2.75) * t + 0.984375) + b;
        }
      },
      easeInOutBounce: function(t, b, _c, d) {
        var c = _c - b;
        var v;
        if (t < d / 2) {
          v = tweenFunctions.easeInBounce(t * 2, 0, c, d);
          return v * 0.5 + b;
        } else {
          v = tweenFunctions.easeOutBounce(t * 2 - d, 0, c, d);
          return v * 0.5 + c * 0.5 + b;
        }
      }
    };
    module.exports = tweenFunctions;
  }
});

// node_modules/react-confetti/dist/react-confetti.mjs
var import_jsx_runtime = __toESM(require_jsx_runtime(), 1);
var import_react = __toESM(require_react(), 1);
var tweens = __toESM(require_tween_functions(), 1);
function degreesToRads(degrees) {
  return degrees * Math.PI / 180;
}
function randomRange(min, max) {
  return min + Math.random() * (max - min);
}
function randomInt(min, max) {
  return Math.floor(min + Math.random() * (max - min + 1));
}
var ParticleShape;
(function(ParticleShape2) {
  ParticleShape2[ParticleShape2["Circle"] = 0] = "Circle";
  ParticleShape2[ParticleShape2["Square"] = 1] = "Square";
  ParticleShape2[ParticleShape2["Strip"] = 2] = "Strip";
})(ParticleShape || (ParticleShape = {}));
var RotationDirection;
(function(RotationDirection2) {
  RotationDirection2[RotationDirection2["Positive"] = 1] = "Positive";
  RotationDirection2[RotationDirection2["Negative"] = -1] = "Negative";
})(RotationDirection || (RotationDirection = {}));
var Particle = class {
  constructor(context, getOptions, x, y) {
    this.getOptions = getOptions;
    const { colors, initialVelocityX, initialVelocityY } = this.getOptions();
    this.context = context;
    this.x = x;
    this.y = y;
    this.w = randomRange(5, 20);
    this.h = randomRange(5, 20);
    this.radius = randomRange(5, 10);
    this.vx = typeof initialVelocityX === "number" ? randomRange(-initialVelocityX, initialVelocityX) : randomRange(initialVelocityX.min, initialVelocityX.max);
    this.vy = typeof initialVelocityY === "number" ? randomRange(-initialVelocityY, 0) : randomRange(initialVelocityY.min, initialVelocityY.max);
    this.shape = randomInt(0, 2);
    this.angle = degreesToRads(randomRange(0, 360));
    this.angularSpin = randomRange(-0.2, 0.2);
    this.color = colors[Math.floor(Math.random() * colors.length)];
    this.rotateY = randomRange(0, 1);
    this.rotationDirection = randomRange(0, 1) ? RotationDirection.Positive : RotationDirection.Negative;
  }
  update() {
    const { gravity, wind, friction, opacity, drawShape } = this.getOptions();
    this.x += this.vx;
    this.y += this.vy;
    this.vy += gravity;
    this.vx += wind;
    this.vx *= friction;
    this.vy *= friction;
    if (this.rotateY >= 1 && this.rotationDirection === RotationDirection.Positive) {
      this.rotationDirection = RotationDirection.Negative;
    } else if (this.rotateY <= -1 && this.rotationDirection === RotationDirection.Negative) {
      this.rotationDirection = RotationDirection.Positive;
    }
    const rotateDelta = 0.1 * this.rotationDirection;
    this.rotateY += rotateDelta;
    this.angle += this.angularSpin;
    this.context.save();
    this.context.translate(this.x, this.y);
    this.context.rotate(this.angle);
    this.context.scale(1, this.rotateY);
    this.context.rotate(this.angle);
    this.context.beginPath();
    this.context.fillStyle = this.color;
    this.context.strokeStyle = this.color;
    this.context.globalAlpha = opacity;
    this.context.lineCap = "round";
    this.context.lineWidth = 2;
    if (drawShape && typeof drawShape === "function") {
      drawShape.call(this, this.context);
    } else {
      switch (this.shape) {
        case ParticleShape.Circle: {
          this.context.beginPath();
          this.context.arc(0, 0, this.radius, 0, 2 * Math.PI);
          this.context.fill();
          break;
        }
        case ParticleShape.Square: {
          this.context.fillRect(-this.w / 2, -this.h / 2, this.w, this.h);
          break;
        }
        case ParticleShape.Strip: {
          this.context.fillRect(-this.w / 6, -this.h / 2, this.w / 3, this.h);
          break;
        }
      }
    }
    this.context.closePath();
    this.context.restore();
  }
};
var ParticleGenerator = class {
  constructor(canvas, getOptions) {
    this.x = 0;
    this.y = 0;
    this.w = 0;
    this.h = 0;
    this.lastNumberOfPieces = 0;
    this.tweenInitTime = Date.now();
    this.particles = [];
    this.particlesGenerated = 0;
    this.removeParticleAt = (i) => {
      this.particles.splice(i, 1);
    };
    this.getParticle = () => {
      const newParticleX = randomRange(this.x, this.w + this.x);
      const newParticleY = randomRange(this.y, this.h + this.y);
      return new Particle(this.context, this.getOptions, newParticleX, newParticleY);
    };
    this.animate = () => {
      const { canvas: canvas2, context, particlesGenerated, lastNumberOfPieces } = this;
      const { run, recycle, numberOfPieces, debug, tweenFunction, tweenDuration } = this.getOptions();
      if (!run) {
        return false;
      }
      const nP = this.particles.length;
      const activeCount = recycle ? nP : particlesGenerated;
      const now = Date.now();
      if (activeCount < numberOfPieces) {
        if (lastNumberOfPieces !== numberOfPieces) {
          this.tweenInitTime = now;
          this.lastNumberOfPieces = numberOfPieces;
        }
        const { tweenInitTime } = this;
        const progressTime = now - tweenInitTime > tweenDuration ? tweenDuration : Math.max(0, now - tweenInitTime);
        const tweenedVal = tweenFunction(progressTime, activeCount, numberOfPieces, tweenDuration);
        const numToAdd = Math.round(tweenedVal - activeCount);
        for (let i = 0; i < numToAdd; i++) {
          this.particles.push(this.getParticle());
        }
        this.particlesGenerated += numToAdd;
      }
      if (debug) {
        context.font = "12px sans-serif";
        context.fillStyle = "#333";
        context.textAlign = "right";
        context.fillText(`Particles: ${nP}`, canvas2.width - 10, canvas2.height - 20);
      }
      this.particles.forEach((p, i) => {
        p.update();
        if (p.y > canvas2.height || p.y < -100 || p.x > canvas2.width + 100 || p.x < -100) {
          if (recycle && activeCount <= numberOfPieces) {
            this.particles[i] = this.getParticle();
          } else {
            this.removeParticleAt(i);
          }
        }
      });
      return nP > 0 || activeCount < numberOfPieces;
    };
    this.canvas = canvas;
    const ctx = this.canvas.getContext("2d");
    if (!ctx) {
      throw new Error("Could not get canvas context");
    }
    this.context = ctx;
    this.getOptions = getOptions;
  }
};
var confettiDefaults = {
  width: typeof window !== "undefined" ? window.innerWidth : 300,
  height: typeof window !== "undefined" ? window.innerHeight : 200,
  numberOfPieces: 200,
  friction: 0.99,
  wind: 0,
  gravity: 0.1,
  initialVelocityX: 4,
  initialVelocityY: 10,
  colors: [
    "#f44336",
    "#e91e63",
    "#9c27b0",
    "#673ab7",
    "#3f51b5",
    "#2196f3",
    "#03a9f4",
    "#00bcd4",
    "#009688",
    "#4CAF50",
    "#8BC34A",
    "#CDDC39",
    "#FFEB3B",
    "#FFC107",
    "#FF9800",
    "#FF5722",
    "#795548"
  ],
  opacity: 1,
  debug: false,
  tweenFunction: tweens.easeInOutQuad,
  tweenDuration: 5e3,
  recycle: true,
  run: true
};
var Confetti = class {
  constructor(canvas, opts) {
    this.lastFrameTime = Date.now();
    this.setOptionsWithDefaults = (opts2) => {
      const computedConfettiDefaults = {
        confettiSource: {
          x: 0,
          y: 0,
          w: this.canvas.width,
          h: 0
        }
      };
      this._options = {
        ...computedConfettiDefaults,
        ...confettiDefaults,
        ...opts2
      };
      Object.assign(this, opts2.confettiSource);
    };
    this.update = () => {
      const { options: { run, onConfettiComplete, frameRate }, canvas: canvas2, context } = this;
      if (frameRate) {
        const now = Date.now();
        const elapsed = now - this.lastFrameTime;
        if (elapsed < 1e3 / frameRate) {
          this.rafId = requestAnimationFrame(this.update);
          return;
        }
        this.lastFrameTime = now - elapsed % frameRate;
      }
      if (run) {
        context.fillStyle = "white";
        context.clearRect(0, 0, canvas2.width, canvas2.height);
      }
      if (this.generator.animate()) {
        this.rafId = requestAnimationFrame(this.update);
      } else {
        if (onConfettiComplete && typeof onConfettiComplete === "function" && this.generator.particlesGenerated > 0) {
          onConfettiComplete.call(this, this);
        }
        this._options.run = false;
      }
    };
    this.reset = () => {
      if (this.generator && this.generator.particlesGenerated > 0) {
        this.generator.particlesGenerated = 0;
        this.generator.particles = [];
        this.generator.lastNumberOfPieces = 0;
      }
    };
    this.stop = () => {
      this.options = { run: false };
      if (this.rafId) {
        cancelAnimationFrame(this.rafId);
        this.rafId = void 0;
      }
    };
    this.canvas = canvas;
    const ctx = this.canvas.getContext("2d");
    if (!ctx) {
      throw new Error("Could not get canvas context");
    }
    this.context = ctx;
    this.generator = new ParticleGenerator(this.canvas, () => this.options);
    this.options = opts;
    this.update();
  }
  get options() {
    return this._options;
  }
  set options(opts) {
    var _a, _b;
    const lastRunState = (_a = this._options) == null ? void 0 : _a.run;
    const lastRecycleState = (_b = this._options) == null ? void 0 : _b.recycle;
    this.setOptionsWithDefaults(opts);
    if (this.generator) {
      Object.assign(this.generator, this.options.confettiSource);
      if (typeof opts.recycle === "boolean" && opts.recycle && lastRecycleState === false) {
        this.generator.lastNumberOfPieces = this.generator.particles.length;
      }
    }
    if (typeof opts.run === "boolean" && opts.run && lastRunState === false) {
      this.update();
    }
  }
};
var ref = import_react.default.createRef();
var ReactConfettiInternal = class extends import_react.default.Component {
  constructor(props) {
    super(props);
    this.canvas = import_react.default.createRef();
    this.canvas = props.canvasRef || ref;
  }
  componentDidMount() {
    if (this.canvas.current) {
      const opts = extractCanvasProps(this.props)[0];
      this.confetti = new Confetti(this.canvas.current, opts);
    }
  }
  componentDidUpdate() {
    const confettiOptions = extractCanvasProps(this.props)[0];
    if (this.confetti) {
      this.confetti.options = confettiOptions;
    }
  }
  componentWillUnmount() {
    if (this.confetti) {
      this.confetti.stop();
    }
    this.confetti = void 0;
  }
  render() {
    const [confettiOptions, passedProps] = extractCanvasProps(this.props);
    const canvasStyles = {
      zIndex: 2,
      position: "absolute",
      pointerEvents: "none",
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      ...passedProps.style
    };
    return (0, import_jsx_runtime.jsx)("canvas", { width: confettiOptions.width, height: confettiOptions.height, ref: this.canvas, ...passedProps, style: canvasStyles });
  }
};
ReactConfettiInternal.defaultProps = {
  ...confettiDefaults
};
ReactConfettiInternal.displayName = "ReactConfetti";
function extractCanvasProps(props) {
  const confettiOptions = {};
  const refs = {};
  const rest = {};
  const confettiOptionKeys = [
    ...Object.keys(confettiDefaults),
    "confettiSource",
    "drawShape",
    "onConfettiComplete",
    "frameRate"
  ];
  const refProps = ["canvasRef"];
  for (const prop in props) {
    const val = props[prop];
    if (confettiOptionKeys.includes(prop)) {
      confettiOptions[prop] = val;
    } else if (refProps.includes(prop)) {
      refProps[prop] = val;
    } else {
      rest[prop] = val;
    }
  }
  return [confettiOptions, rest, refs];
}
var ReactConfetti = import_react.default.forwardRef((props, ref2) => (0, import_jsx_runtime.jsx)(ReactConfettiInternal, { canvasRef: ref2, ...props }));
export {
  ReactConfetti as default
};
//# sourceMappingURL=react-confetti.js.map
