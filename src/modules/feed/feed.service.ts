export default class FeedService {
  static getFeed(page: number, limit: number) {
    const items = Array.from({ length: limit }, (_, i) => {
      const id = page * limit + i + 1;
      return {
        id,
        data: {
          title: `Publicación aleatoria #${id} - ${Math.random()
            .toString(36)
            .slice(2, 8)}`,
        },
      };
    });
    return items;
  }

  static async getComments(page: number, limit: number) {
    // Simula un retraso de 1 segundo
    await new Promise((resolve) => setTimeout(resolve, 500));
    const items = Array.from({ length: limit }, (_, i) => {
      const id = page * limit + i + 1;
      return {
        id,
        data: {
          title: `Mensaje aleatorio #${id} - ${Math.random()
            .toString(36)
            .slice(2, 8)}`,
        },
      };
    });
    return items;
  }
}
