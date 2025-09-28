declare module "reading-time" {
  const readingTime: (text: string) => {
    text: string;
    minutes: number;
    time: number;
    words: number;
  };
  export default readingTime;
}
