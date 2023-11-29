import { Component } from '@angular/core';
import FingerprintJS from '@fingerprintjs/fingerprintjs';
import { Engine, IOptions, RecursivePartial } from "tsparticles-engine";
import { loadFull } from "tsparticles";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  fpPromise = FingerprintJS.load()
  characters1 = [
    {
      icon: "../assets/chim_canh_cut.jpg"
    }, {
      icon: "../assets/co_tien.jpg"
    }, {
      icon: "../assets/nguoi_danh_trong.jpg"
    }, {
      icon: "../assets/nguoi_thoi_ken.jpg"
    },
  ]
  characters2 = [
    {
      icon: "../assets/nguoi_tuyet.jpg"
    }, {
      icon: "../assets/ong_gia_noel.jpg"
    }, {
      icon: "../assets/tuan_loc.jpg"
    }, {
      icon: "../assets/vu_cong.jpg"
    },
  ];
  id = "tsparticles";
  particlesOptions: RecursivePartial<IOptions> = {
    "fullScreen": {
      "zIndex": 5
    },
    "particles": {
      "number": {
        "value": 0
      },
      "color": {
        "value": [
          "#00FFFC",
          "#FC00FF",
          "#fffc00"
        ]
      },
      "shape": {
        "type": [
          "circle",
          "square",
          "triangle",
          "polygon",
          "character"
        ],
        "options": {
          "polygon": [
            {
              "sides": 5
            },
            {
              "sides": 6
            }
          ],
          "character": {
            "fill": true,
            "font": "Verdana",
            "style": "",
            "weight": 400,
            "particles": {
              "size": {
                "value": 8
              }
            },
            "value": [
              "💩",
              "🤡",
              "🍀",
              "🍙",
              "🦄",
              "⭐️"
            ]
          }
        }
      },
      "opacity": {
        "value": 1,
        "animation": {
          "enable": true,
          "minimumValue": 0,
          "speed": 2,
          "startValue": "max",
          "destroy": "min"
        }
      },
      "size": {
        "value": 4,
        "random": {
          "enable": true,
          "minimumValue": 2
        }
      },
      "links": {
        "enable": false
      },
      "life": {
        "duration": {
          "sync": true,
          "value": 5
        },
        "count": 1
      },
      "move": {
        "enable": true,
        "gravity": {
          "enable": true,
          "acceleration": 10
        },
        "speed": {
          "min": 10,
          "max": 20
        },
        "decay": 0.1,
        "direction": "none",
        "straight": false,
        "outModes": {
          "default": "destroy",
          "top": "none"
        }
      },
      "rotate": {
        "value": {
          "min": 0,
          "max": 360
        },
        "direction": "random",
        "move": true,
        "animation": {
          "enable": true,
          "speed": 60
        }
      },
      "tilt": {
        "direction": "random",
        "enable": true,
        "move": true,
        "value": {
          "min": 0,
          "max": 360
        },
        "animation": {
          "enable": true,
          "speed": 60
        }
      },
      "roll": {
        "darken": {
          "enable": true,
          "value": 25
        },
        "enable": true,
        "speed": {
          "min": 15,
          "max": 25
        }
      },
      "wobble": {
        "distance": 30,
        "enable": true,
        "move": true,
        "speed": {
          "min": -15,
          "max": 15
        }
      }
    },
    "emitters": {
      "life": {
        "count": 0,
        "duration": 0.1,
        "delay": 0.4
      },
      "rate": {
        "delay": 0.1,
        "quantity": 150
      },
      "size": {
        "width": 0,
        "height": 0
      }
    }
  }


  isChoose = false;
  firework = false;
  shine = false;
  constructor() {
    this.fpPromise.then(fp => fp.get())
      .then(result => console.log(result.visitorId))
  }

  choose(ev: any) {
    const dom = ev.target as HTMLImageElement;
    const char = dom.cloneNode() as HTMLImageElement;
    const position = dom.getBoundingClientRect();
    dom.parentElement?.appendChild(char)
    char.classList.add("zoom");
    char.style.top = position.y + "px";
    char.style.left = position.x + "px";
    char.style.width = position.width + "px";
    char.style.height = position.height + "px";
    this.isChoose = true;
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    const elementX = position.left + position.width / 2;
    const elementY = position.top + position.height / 2;

    const translateX = windowWidth / 2 - elementX;
    const translateY = windowHeight / 2 - elementY;

    char.style.transform = `translate(${translateX}px, ${translateY}px) scale(2)`;
    setTimeout(() => {
      this.firework = true;
      this.shine = true;
    }, 900);
  }

  async particlesInit(engine: Engine): Promise<void> {
    await loadFull(engine);
  }
}
