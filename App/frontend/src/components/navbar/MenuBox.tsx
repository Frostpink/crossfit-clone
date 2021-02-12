import styled, { css, keyframes } from 'styled-components'

const fadeIn = keyframes`
  from {
    transform: scale(.25);
    opacity: 0;
  }

  to {
    transform: scale(1);
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  from {
    transform: scale(1);
    opacity: 1;
  }

  to {
    transform: scale(.25);
    opacity: 0;
  }
`;

type Props = {show:boolean}

export default styled.div`
    padding: 7px 0px;
    border-radius: 5px;
    border: 1px solid #d1d1d1;
    position: absolute;
    background-color: #fff;
    margin-top: 10px;
    margin-left: 6px;
    display: flex;
    flex-direction: column;
    box-shadow: 0 0 30px rgba(189, 189, 189, 0.274);

    min-width: 10rem;
    overflow: hidden;

    visibility: ${(props: Props) => !props.show ? 'hidden' : 'visible'};
    animation: ${(props: Props) => !props.show ? fadeOut : fadeIn} 200ms linear;
    transition: visibility 200ms linear;
`