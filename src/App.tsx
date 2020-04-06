import React, { useState, useRef } from 'react';
import styles from './App.module.css';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import { event_images, ethics_images } from './assets';
import { EventDialog, IOption } from './component/Dialog';
import { Button, TextField, MenuItem, Toolbar, AppBar, Typography } from '@material-ui/core';
import { Add, Close } from '@material-ui/icons';
import Select from '@material-ui/core/Select';
import html2canvas from 'html2canvas';


function App() {
  var initialOptions: IOption[] = [{ content: "睿智的群星玩家 +1000" }];

  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("群星事件生成器");
  const [image, setImage] = useState(event_images[0]);
  const [content, setContent] = useState('欢迎使用群星事件生成器！');
  const [options, setOptions] = useState(initialOptions);
  const [resultOpen, setResultOpen] = useState(false);
  const resultElement = useRef<HTMLDivElement>(null);

  const handleClose = () => {
    setOpen(false);
  };

  const onEventImageSelected = (it: string) => {
    setImage(it);
    setOpen(false)
  }

  const setOptionText = (it: string, index: number) => {
    setOptions([...options].map((it2, index2) => {
      if (index2 === index) {
        it2.content = it;
      }
      return it2;
    }))
  }

  const setOptionEthics = (it: unknown, index: number) => {
    setOptions([...options].map((it2, index2) => {
      if (index2 === index) {
        it2.ethics = it as string;
      }
      return it2;
    }))
  }

  const addOption = () => {
    setOptions([...options].concat({ content: "新选项" }))
  }

  const removeOption = (it: number) => {
    setOptions([...options].filter((_, index) => index !== it))
  }

  const generate = () => {
    const element = document.querySelector('#event-dialog');
    if (element instanceof HTMLElement) {
      html2canvas(element).then(result => {
        setResultOpen(true);
        resultElement.current!.appendChild(result)
      })
    }
  }

  return (
    <div style={{ height: '100%' }} className={styles.app_container}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }} >
            群星事件生成器
          </Typography>
        </Toolbar>
      </AppBar>
      <Button color="primary" className={styles.generate_button} variant="contained" onClick={() => generate()}>生成！</Button>
      <div className={styles.generator_content}>
        <div className={styles.data_input_container}>
          <TextField label="标题" value={title} onChange={(e) => setTitle(e.target.value)} />
          <Button variant="outlined" color="primary" onClick={() => setOpen(true)}>
            选择事件图片
          </Button>
          <TextField label="描述" value={content} multiline onChange={(e) => setContent(e.target.value)} />
          <div className={styles.data_option_container}>
            选项
          {options.map((it, index) => (
            <div key={index}>
              <Select
                value={it.ethics}
                onChange={(e) => setOptionEthics(e.target.value, index)}
              >
                <MenuItem>None</MenuItem>
                {ethics_images.map((ethic, eindex) => (
                  <MenuItem value={ethic} key={index}>
                    <img className={styles.ethic_img} src={ethic} alt="ethic" />
                  </MenuItem>
                ))}
              </Select>
              <TextField value={it.content} onChange={(e) => setOptionText(e.target.value, index)} />
              <Button color="primary" onClick={() => removeOption(index)}>
                <Close />
              </Button>
            </div>
          ))}
            <Button variant="outlined" color="primary" onClick={() => addOption()}>
              <Add />
            </Button>
          </div>
        </div>
        <div id="event-dialog">
          <EventDialog title={title} content={content} image={image} options={options} />
        </div>
      </div>
      <Dialog
        onClose={handleClose}
        open={open}>
        <DialogContent dividers={true}>
          {event_images.map((it, index) => <img onClick={() => onEventImageSelected(it)} className={styles.event_select_image} key={index} alt={it} src={it} />)}
        </DialogContent>
      </Dialog>
      <Dialog
        onClose={() => setResultOpen(false)}
        open={resultOpen}>
        <DialogContent dividers={true}>
          <div ref={resultElement}>

          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default App;
