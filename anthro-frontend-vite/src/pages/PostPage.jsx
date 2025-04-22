import { useParams } from "react-router";

function PostPage() {
  const { topic } = useParams();

  // Ideally, retrieve the topic details from the same data source as above
  const topicContent = {
    water: {
      title: "Water",
      body: "This article explores water ...",
      // Optionally add images or links here
    },
    materiality: {
      title: "Materiality",
      body: "In this piece, we analyze materiality ...",
    },
    time: {
      title: "Time",
      body: "Time has a unique dimension ...",
    },
    mobility: {
      title: "Mobility",
      body: "Mobility in the modern world ...",
    },
  }[topic];

  if (!topicContent) {
    return <p>Topic not found.</p>;
  }

  return (
    <div className="container mx-auto px-6 py-8">
      <h1 className="text-4xl font-bold mb-4 text-amber-500">
        {topicContent.title}
      </h1>
      <div className="text-lg text-gray-800">{topicContent.body}</div>
    </div>
  );
}

export default PostPage;
