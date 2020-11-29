import React, { 
    useState, 
    useEffect, 
    useRef, 
    useCallback 
} from 'react';
import { 
    faChevronCircleLeft, 
    faChevronCircleRight,
    faTimes, 
} from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux'; 
import { MovieList } from '../../model/MovieList';
import { REMOVE_FAVORITE_MOVIE_REQUEST } from '../../actions/user';
import Icon from '../../atoms/Icons';
import styled from 'styled-components';


interface Props {
    movieLists:Array<MovieList>;
    editMode?:boolean;
}

const Slider=({movieLists,editMode} : Props)=>{
    // 최초 슬라이드 개수 
    const initialSlide = Math.ceil(movieLists.length/5);
    const dispatch = useDispatch();
    const [ TOTAL_SLIDES, setTotalSlides ] = useState(initialSlide);
    const [ currentSlide, setCurrentSlide ] = useState(0); // 현재 슬라이드 페이지 
    const slideRef = useRef(null);
    
    useEffect(()=>{
        const onResize=()=>{
            if(window.innerWidth<=768){
                setTotalSlides(Math.ceil(movieLists.length/2));
            }
            else{
                setTotalSlides(Math.ceil(movieLists.length/5));
            }
        };
        window.addEventListener('resize', onResize); // 화면 크기 바뀔 때 TOTAL_SLIDES 변경 
        return ()=>{
            window.removeEventListener('resize',onResize);
        }
    },[]);

    useEffect(()=>{ // 슬라이드 움직였을 경우 화면 움직여주기 
        slideRef.current.style.transition="transform 0.5s ease-in-out";
        slideRef.current.style.transform =`translateX(-${currentSlide}00%)`;
    },[currentSlide]);


    const nextSlide = useCallback(()=>{ // 다음 슬라이드 보여주기 버튼 
        if(currentSlide >=TOTAL_SLIDES-1){
            setCurrentSlide(0);
        }
        else{
            setCurrentSlide(currentSlide+1);
        }
    },[currentSlide]);

    const prevSlide = useCallback(() => { // 이전 슬라이드 보여주기 버튼 
        if(currentSlide === 0){
            setCurrentSlide(TOTAL_SLIDES-1);
        }
        else{
            setCurrentSlide(currentSlide-1);
        }
    },[currentSlide]);

    const removeMovie = useCallback((id)=>{ // 특정 영화 삭제 
        dispatch({
            type:REMOVE_FAVORITE_MOVIE_REQUEST,
            data:id,
        });
    },[]);

    return(
        <Container>
            <SliderContainer ref={slideRef}>
                {movieLists.map((v,i)=>
                <Slide key={v.image}>
                    <IMG src={v.image}/>
                    <MovieTitle>{v.title}</MovieTitle>
                    {editMode &&
                    <CloseButton>
                        <Icon icon={faTimes}
                        className="faTimes"
                        onClick={removeMovie.bind(this,v.id)}
                        color="red"
                        size={30}
                        />
                    </CloseButton>}
                </Slide>)}
            </SliderContainer>
            <MoveButton direction="left">
                <Icon icon={faChevronCircleLeft}
                className="faChevronCircleLeft"
                onClick={prevSlide}   
                size={50}     
                color="lightPurple"
                />
            </MoveButton>
            <MoveButton direction="right">
                <Icon icon={faChevronCircleRight}
                className="faChevronCircleRight"
                onClick={nextSlide}
                size={50}
                color="lightPurple"
                />
            </MoveButton>
        </Container>
    );
}

Slider.defaultProps={
    editMode:false,
}

const Container = styled.div`
    width:100%;
    overflow:hidden;
    position:relative;
`;

const SliderContainer = styled.div`
    width:80%;
    display:flex;
    padding:10px 25px 25px 25px;
`;

const Slide = styled.div`
    display:flex;
    flex-direction:column;
    position:relative;
    padding:20px;
`;

const IMG = styled.img`
    height:170px;
`;

const MovieTitle=styled.div`
    margin-top:10px;
    font-weight:bold;
`;

const CloseButton = styled.div`
    position:absolute;
    top:30px;
    right:30px;
    border-radius:50%;
    width:30px;
    height:30px;
    text-align:center;

    transition: 0.2s background-color ease-in-out;

    &:hover{
        background-color:rgba(255,255,255,0.5);
    }
`;

const MoveButton = styled.div<{direction:string}>`
    position:absolute;
    left:${(props)=>props.direction==='left'?'0':''};
    right:${(props)=>props.direction==='right'?'0':''};
    top:50%;
    transform:translateY(-50%);
    z-index:100;
`;

export default Slider;