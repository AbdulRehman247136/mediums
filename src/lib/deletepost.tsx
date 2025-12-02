export const deletePost = async (id: string) => {
    try {
      const res = await fetch(`/api/posts/${id}`, {
        method: "DELETE",
      });
  
      const data = await res.json();
  
      if (!res.ok) {
        throw new Error(data.message || "Failed to delete post");
      }
  
      return data;
    } catch (error: any) {
      console.error("Delete Error:", error.message);
      throw new Error(error.message);
    }
  };
  