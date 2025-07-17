import { CardActionArea, Fade } from '@mui/material';
import shadows from '@mui/material/styles/shadows';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const CategoryCard = ({ category, shadow }) => {

  
    const navigate = useNavigate();
    console.log(category)

    return (
        <CardActionArea
            onClick={() => navigate(`/categories/${category.name.toLowerCase()}`)}
            sx={{ maxWidth: '19rem', mx: 'auto', boxShadow: shadow ? '0 1px 2px 0 rgb(0 0 0 / 0.05)' : 'none' }}>
            <div className='rounded-lg w-full cursor-pointer xl:h-[11rem]  h-[10rem] flex items-center shadow-sm justify-center' style={{ backgroundColor: category.bgColor }}>
                <div className='sm:space-y-2 space-y-3.5'>
                    {/* Img */}
                    <Fade in={true}>
                        <img
                            className='xl:h-[5rem]  h-[4.5rem] m-auto'
                            src={category.img}
                            // src="https://tse4.mm.bing.net/th?id=OIP.zzB-RUq1RlCFutGUbXjOJQHaFF&pid=Api&P=0&h=220"
                            loading='lazy'
                            alt={category.name} />
                    </Fade>

                    <div className='space-y-1'>
                        {/* Name */}
                        <h3 className='text-center text-xl capitalize font-semibold text-gray-700'>
                            {category.name}
                        
                        </h3>

                        {/*Available Items*/}
                        <h3 className='text-center  text-xs text-gray-600'>
                            {/* (5 Items) */}
                            {category.available}
                        </h3>
                    </div>
                </div>
            </div>
        </CardActionArea>
    );
};

export default CategoryCard;





