import arrow from '/assets/triangular-arrow.svg';

const HomeBlock = () => {
  const template = document.createElement('template');

  template.innerHTML = `
    <style>
        .home-block{
            display: flex;
            background-color: #fff;
            margin: 1rem 0;
            padding: 1.25rem;
        }
        .block-item {
            background-color: #fbf2ea;
            width: 33.3%;
            margin-right: 1rem;
        }
        .title{
            color: #fff;
            font-weight: bold;
            position: relative;
            margin: 0;
            padding: 0.5rem;
        }
        .title h3{
            position: relative;
            z-index: 1;
            margin: 0;
        }
        .title:after{
            content: '';
            position: absolute;
            bottom: -30px;
            left: 20px;
            border-style: solid;
            border-width: 17px 14px;
            z-index: 0;
        }

        .open .title:after {
            border-color: #5b8ad6 transparent transparent;
        }

        .caring .title:after {
            border-color: #f4ba44 transparent transparent;
        }

        .simple .title:after {
            border-color: #c5569a transparent transparent;
        }

        .open .title {
            background-color: #5b8ad6;
        }

        .caring .title {
            background-color: #f4ba44;
        }

        .simple .title {
            background-color: #c5569a;
        }

        .content{
            padding: 0.5rem;
            font-size: 14px;
        }

        .toggle{
            cursor: pointer;
            text-decoration: underline;
            color: #257886;
            transition: color 0.3s ease;
        }
        .toggle:hover{
            color: #32acc0;
        }
        .toggle-icon svg{
            transform: rotate(-90deg);
            width: 10px;
            height: 10px;
        }
        .read-more{
            display: none;
        }

        .block-item__list{
            list-style-type: none;
            padding: 0;
        }
        .block-item__list li:before{
            content: "";
            display: inline-block;
            vertical-align: middle;
            width: 8px;
            height: 12px;
            background-color: #c5569a;
            border-radius: 0 15px 15px 0;
            margin-right: 8px;
        }
        @media(max-width: 960px){
            .home-block {
                flex-direction: column;
            }

            .block-item{
                width: 100%;
                margin-bottom: 1rem;
            }

            .block-item:last-child{
                margin-bottom: 0;
            }
        }
    </style>
    <div class="home-block">
        <div class="block-item open">
            <div class="title">
                <h3>Open</h3>
            </div>
            <div class="content">
                <p><strong>One of the core values of Swedbank</strong></p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            </div>
        </div>
        <div class="block-item caring">
            <div class="title">
                <h3>Caring</h3>
            </div>
            <div class="content">
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Cupiditate, dolores?
                </p>
                <p class="read-more">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Quisquam nobis excepturi accusamus sapiente minus fugiat
                    eaque repellat nesciunt saepe? Totam.
                </p>
                <div class="toggle">
                    <span class="toggle-icon">${arrow}</span>
                    <span class="toggle-text">Read more</span>
                </div>
            </div>
        </div>
        <div class="block-item simple">
            <div class="title">
                <h3>Simple</h3>
            </div>
            <div class="content">
                <ul class="block-item__list">
                    <li>
                        Lorem ipsum dolor sit,
                        amet consectetur adipisicing elit.
                    </li>
                    <li>
                        Lorem ipsum dolor sit,
                        amet consectetur adipisicing elit.
                    </li>
                </ul>
            </div>
        </div>
    </div>
  `;

  return template.content.cloneNode(true); ;
};

export default HomeBlock;
