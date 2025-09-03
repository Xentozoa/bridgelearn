import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">
        <Link href="/">
          BridgeLearn
        </Link>
      </div>
      <ul className="nav-links">
        <li>
          <Link href="/dashboard">
            Dashboard
          </Link>
        </li>
        <li>
          <Link href="/lessons">
            Lessons
          </Link>
        </li>
        <li>
          <Link href="/quizzes">
            Quizzes
          </Link>
        </li>
        <li>
          <Link href="/rewards">
            Rewards
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
