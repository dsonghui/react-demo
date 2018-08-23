import { MakrRan } from "./helper";

export class Ball {
    vx: number;
    vy: number;
    x: number;
    y: number;
    r: number;
    color: string;
    key: string;
    constructor(option: any) {
        this.vx = option.vx || 0;
        this.vy = option.vy || 0;
        this.x = option.x || 0;
        this.y = option.y || 0;
        this.r = option.r || 0;
        this.color = option.color || "#" + (~~(Math.random() * (1 << 24))).toString(16);
        this.key = option.key || String(Math.random());
    }

    update(width: number, height: number) {
        if ((this.x + this.r) >= width) {
            this.x = width - this.r - 5;// 防止半身进入边缘，无限循环，黏住边缘
            this.vx = -(this.vx);// 反弹
        }

        if ((this.x - this.r) <= 0) {
            this.x = this.r + 5;
            this.vx = -(this.vx);
        }

        if ((this.y + this.r) >= height) {
            this.y = height - this.r - 5;
            this.vy = -(this.vy);
        }

        if ((this.y - this.r) <= 0) {
            this.y = this.r + 5;
            this.vy = -(this.vy);
        }
        this.x += this.vx;// 小球前进
        this.y += this.vy;
    }
}

export class windowWrap {
    started: boolean = false;
    width: number;
    height: number;
    balls: Ball[] = [];
    constructor(w: number, h: number) {
        this.width = w;
        this.height = h;
    }

    start(e: any) {
        console.log(this);
        Array(50).fill(1).map(r => {
                this.balls.push(
                    new Ball({
                            r: MakrRan(2, 7),
                            vx: MakrRan(1, 7) > 3 ? -MakrRan(1, 2) : MakrRan(1, 2),
                            vy: MakrRan(1, 7) > 3 ? -MakrRan(1, 2) : MakrRan(1, 2),
                            x: MakrRan(0, this.width),
                            y: MakrRan(0, this.height),
                        }
                    )
                );
            }
        );
        this.started = true;
    }
}