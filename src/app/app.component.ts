import { AfterViewInit, Component, OnInit } from '@angular/core';
import FingerprintJS from '@fingerprintjs/fingerprintjs';
import { Engine, IOptions, RecursivePartial } from "tsparticles-engine";
import { loadFull } from "tsparticles";
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit, OnInit {
  fpPromise = FingerprintJS.load();
  id = "";
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
  activeItem: any = null;
  isUnlucky: any = false;
  isChoose = false;
  data: any = null;
  firework = false;
  showChoose = true;
  shine = false;
  test = 0;
  ringing: any;
  interval: any;
  isHaveData = false;
  sub: BehaviorSubject<any> = new BehaviorSubject(null);
  constructor(private http: HttpClient) {
    this.fpPromise.then(fp => fp.get())
      .then(result => {
        const id = localStorage.getItem("id");
        if (id) {
          this.id = id;
        } else {
          localStorage.setItem("id", result.visitorId);
          this.id = result.visitorId;
        }
        this.http.get(" https://noel.sqr.vn/api/prize/check/" + this.id).subscribe((res: any) => {
          if (res?.data) {
            this.data = res.data;
            this.animation();
          }
        })
      });
  }

  ngOnInit() {
    this.ringing = () => {
      if (!this.isHaveData) {
        this.http.post(" https://noel.sqr.vn/api/prize/shaking/" + this.id, {}).subscribe((res: any) => {
          if (res?.data) {
            this.isHaveData = true;
            document.getElementsByClassName("bell")[0].classList.add("ringing");
            const audioElement = document.getElementById("audio")! as HTMLAudioElement;
            audioElement.load();
            audioElement.play().catch(() => {
              document.addEventListener('click', () => {
                audioElement.play();
              }, { once: true });
            });
            const a = setInterval(() => {
              if (audioElement.paused) {
                audioElement.play().catch(() => {
                  document.addEventListener('click', () => {
                    audioElement.play();
                  }, { once: true });
                });
              }
            }, 200);
            if (window?.navigator?.vibrate) {
              window.navigator.vibrate(15000);
            }
            setTimeout(() => {
              this.data = res.data;
              this.animation();
              clearInterval(a);
            }, 15000);
            clearInterval(this.interval);
          };
        });
      }
    }

  }

  animation() {
    this.firework = true;
    setTimeout(() => {
      this.firework = false;
    }, 10000);
  }

  ngAfterViewInit(): void {

  }

  async particlesInit(engine: Engine): Promise<void> {
    await loadFull(engine);
  }
}
