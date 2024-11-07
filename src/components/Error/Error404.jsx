import React, { useEffect, useRef } from 'react';
import '../../Styles/Global.css';

const Error404 = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const colors = ['#FFFFFF', '#FFD700', '#00BFFF', '#FF4500', '#8A2BE2'];

    let stars = [];
    const starCount = 200;

    const createStar = () => {
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.5,
        color: colors[Math.floor(Math.random() * colors.length)],
        speedX: Math.random() * 0.5 - 0.25,
        speedY: Math.random() * 0.5 - 0.25,
      };
    };

    const drawStar = (star) => {
      ctx.fillStyle = star.color;
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
      ctx.closePath();
      ctx.fill();
    };

    const updateStar = (star) => {
      star.x += star.speedX;
      star.y += star.speedY;

      if (star.x > canvas.width) star.x = 0;
      if (star.x < 0) star.x = canvas.width;
      if (star.y > canvas.height) star.y = 0;
      if (star.y < 0) star.y = canvas.height;
    };

    const animateStars = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach((star) => {
        updateStar(star);
        drawStar(star);
      });
      requestAnimationFrame(animateStars);
    };

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    stars = Array.from({ length: starCount }, createStar);
    animateStars();

    return () => {
      cancelAnimationFrame(animateStars);
    };
  }, []);

  return (
    <div className="error-container">
      <canvas ref={canvasRef} className="starfield-canvas" />
      <div className="content">
        <h1 className="error-heading">404</h1>
        <p className="error-message">Oops! Page not found.</p>
      </div>
    </div>
  );
};

export default Error404;