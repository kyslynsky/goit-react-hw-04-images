export const Button = ({ onClick, status }) => (
  <button disabled={status === 'pending'} onClick={onClick}>
    Load more
  </button>
);
