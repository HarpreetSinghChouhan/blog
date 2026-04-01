type ErrorProps = {
  error: string[];
};

export default function Error({ error }: ErrorProps) {
  return (
    <>
      {error && error.length > 0 && (
        <div style={{ color: "red" }}>
          {error.map((err, i) => (
            <div key={i}>{err}</div>
          ))}
        </div>
      )}
    </>
  );
}