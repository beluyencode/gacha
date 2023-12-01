import { AfterViewInit, Component } from '@angular/core';
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
export class AppComponent implements AfterViewInit {
  fpPromise = FingerprintJS.load();
  id = "";
  characters1 = [
    {
      id: 1,
      icon: "../assets/chim_canh_cut.png",
      text: "Chim cánh cụt Tobi mũm mĩm!"
    }, {
      id: 2,
      icon: "../assets/co_tien.png",
      text: "Thiên sứ xinh đẹp!"
    }, {
      id: 3,
      icon: "../assets/nguoi_danh_trong.png",
      text: "Gấu Teddy năng động!"
    }, {
      id: 4,
      icon: "../assets/nguoi_thoi_ken.png",
      text: "Chú lính chì mạnh mẽ!"
    },
  ]
  characters2 = [
    {
      id: 5,
      icon: "../assets/nguoi_tuyet.png",
      text: "Người tuyết đáng yêu!"
    }, {
      id: 6,
      icon: "../assets/ong_gia_noel.png",
      text: "Ông già Noel ngộ nghĩnh!"
    }, {
      id: 7,
      icon: "../assets/tuan_loc.png",
      text: "Tuần lộc Hope dễ thương!"
    }, {
      id: 8,
      icon: "../assets/vu_cong.png",
      text: "Cô vũ công xinh đẹp!"
    },
  ];
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
  firework = false;
  showChoose = true;
  shine = false;
  sub: BehaviorSubject<any> = new BehaviorSubject(null);
  constructor(private http: HttpClient) {
    this.fpPromise.then(fp => fp.get())
      .then(result => {
        this.id = result.visitorId;
        this.http.get("http://150.95.112.76:7898/api/v1/lucky", {
          params: {
            device_id: this.id
          }
        }).subscribe((res: any) => {
          console.log(res);
          if (res.data) {
            this.isUnlucky = res.data.is_lucky;
            if (this.isUnlucky) {
              this.sub.next(res.data.type)
            }
          } else {
            this.isUnlucky = null;
          }
        })
      });
  }

  ngAfterViewInit(): void {
    this.sub.subscribe(res => {
      if (res) {
        const list = document.getElementsByClassName("character") as any;
        [...(list || [])].forEach((ele: HTMLDivElement, index) => {
          if (index + 1 === res) {
            (ele.childNodes[0] as HTMLDivElement).click()
          }
        })
      }
    })
  }

  choose(ev: any, data: any) {
    this.activeItem = data;
    const dom = ev.target as HTMLImageElement;
    const char = dom.cloneNode() as HTMLImageElement;
    const position = dom.getBoundingClientRect();
    dom.parentElement?.appendChild(char);
    char.classList.add("no_hidden")
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

    char.style.transform = `translate(${translateX}px, ${translateY}px) scale(3)`;
    if (this.isUnlucky === null) {
      console.log(data.id);

      this.http.post("http://150.95.112.76:7898/api/v1/lucky", {
        device_id: this.id,
        type: data.id
      }).subscribe(res => {
        console.log(res);

      })
    }
    setTimeout(() => {
      this.firework = true;
      this.shine = true;
      this.showChoose = false;
    }, 900);
  }

  async particlesInit(engine: Engine): Promise<void> {
    await loadFull(engine);
  }
}
