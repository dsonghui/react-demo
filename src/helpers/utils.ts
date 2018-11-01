// 生成随机数
export function MakeRan(min: number, max: number) {
    return parseInt(((max - min) * Math.random()) as any, 10) + min;
}
