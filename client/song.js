var song_MAIN = {
speed:2,
loop:true,
ch:[
" 0r3+c15r3c9r3-d9r3a3r3a9r3a#9r6f12r6g36r3+c15r3c9r3-d9r3a3r3a9r3a#9r6+f12r6d#36r6d#12r6d30r6c0r6d12r6c30r6c0r6-d#12r6a18r6a0r6a#0r6+c0r6c12r6-d18r6b0r6+c0r6d0r6f12r6e18r6e0r6f0r6g0r24+c114r6-c24r3g#3r3g0r3f0r6-d12r6d#12r6a#6r6b6r15a#3r27a#0r",
" 0r3e15r3g9r3b9r3f3r3f9r3f9r6c12r6d#36r3e15r3g9r3b9r3f3r3f9r3f9r6g12r6a#36r6g12r6f18r6a0r3-f3r3e3r6e6r3e9r3e9r3e9r3e3r3-a#3r6++c12r6f18r6f0r6g0r6a0r3-d9r3d9r3d33r3c9r3c9r3c9r3-a#9r3a#9r3g#9r3g#9r3g#9r3a#9r3a#9r3+d#9r3d#9r3d#9r3d#9r3d#3r3-a#3r3+d#9r3d#9r3d#9r6b6r3d#3r3-a#3r3g9r3g3r6+e0r3-f#9r3f9r3e9r3d#9r3d#9r3d9r3+d9r3d3r3-d33r3d21r6d0r",
" 0r3g15r3e9r3g9r3c3r3c9r3c9r6-a6r3g3r6a#0r3g9r3g9r3g3r3d3r3g9r3g9r3g9r3g3r3d3r3g9r3+d#9r6a#12r6g36r6a#12r6a#18r6f0r6a#0r6a0r6a#12r6g18r3g3r6g0r6g0r6a#12r6c36r6f12r6b18r6g0r6a0r6b0r6a12r6g36r6+c12r6f12r6d#6r6d6r6d12r6d#12r6-f18r6a#12r6g#12r6d#18r6d#30r6g6r6f#6r15f3r27f0r",
" 0r3-g9r3g9r3g9r3g9r3g9r3g9r3g117r3g9r3g9r3g3r3c3r3g9r3g3r3c3r6g0r6f#0r3f9r3f3r6a#0r3f9r3f3r3-a#15r6+a#54r3f9r3f9r3f9r3d#9r3d#3r3-f39r3g9r3g3r3-g63r6+++g#12r6g#12r6g#6r6a#0r3a#3r6a#12r6a#12r6a#18r6g12r6d#12r6-g#18r6g12r6a#12r6+d#6r6c#6r15c3r27c0r",
" 60r3d#27r6d36r3g15r3e9r3g9r3c3r3c9r3c9r6d12r6c36r6c42r6g6r6g12r6c18r3e3r6e6r6f54r6a12r6f18r6d0r6e0r6g0r6+c12r6c18r6c0r6d0r6e0r6g12r6c12r6c18r24a#12r6-c#18r6c12r6c12r6-f18r6a#12r6g#12r6+c6r3++d#9r3d0r",
" 564r6d#12r6c12r6d#6r6f6r6f12r6g12r6g#18r6d#30r3-d#21r3++d#15r3d#15r6--g#6r6g#6r15g3r27f#15r3d9r3d9r3d9r3d9r3d0r",
" 780r3+a#9r6d#6r15d3r3a#0r",]}

var song_EMPTY = { speed:1, loop:false, ch:[""] }

var sfx_HIT = {
speed:1,
loop:false,
ch:[
" ++2g#0r",
" +2g#0r",
" 2g#0r",
" -2g#0r",
" --2g#0r",
]
}

var sfx_GOOD = {
speed:2,
loop:false,
ch:[
" 4cdg+cd0r",
" 4-ab+dab0r"
]}

var sfx_BAD = {
speed:2, loop:false,
ch:[
" 2-crcrcr",
" 2-f#rf#rf#r",
]}

var sfx_WIN = {
speed:1,
loop:false,
ch:[
" 12r12a0r12+c0r12-g0r12+d0r12c0r12d#0r12f0r12-a#0r24+c0r",
" 12r12c12r12d12r12d#12r18d#6r24f0r",
" 12r12-f12r12g12r12g#12r18c6r24f0r",
" 12r12e12r12b12r12g12r18g6r24c0r",
" 36r12-e12r12c#12r18a#6r24a0r",
" 108r24g0r",
" 108r24--f0r",]}

var song_RESULTS = {
speed:1,
loop:true,
ch:[
" 0r8d#8r20f4r8d#0r8g8r8g#16r8+c0r8d#8r8c0r8d#8r32c24r8d#8r8c0r8d#8r8c16r8d#16r8c0r8-c8r8g0r8a#8r8f16r8d#24r8d#8r20f4r8d#0r8g8r8g#16r8a0r8a#16r8d#16r8-a#8r4f#0r4f0r24e0r40d#0r8c0r8-a#16r8a#16r8d#24r8a#0r8d#0r8d16r8a16r8g16r8+d16r48f#0r8d16r8+c8r8f0r8e8r8c#0r8d8r8a16r8g0r8-c16r8a16r8a16r8g#16r24e0r8g#8r8+g0r8c#8r8a#0r8c8r20g#4r8a#0r24-a#0r8-g#8r8a0r8a#16r8d#16r8g16r8c16r8f40r8a#40r8d#16r8d#16r9d#15r9d#6r9d#0r",
" 0r12--g#12r12+f12r8g16r8g#8r8+d#0r8c#16r8+c8r32-c#16r8c0r16c#8r8g#8r8a16r8g16r8g0r8a#16r8d8r8c#48r8c8r20-b12r24g0r16g#0r8a0r12a#4r4a0r4g#0r40g8r8a#16r8g#16r8g#16r8g#8r8b16r8a#0r8d#32r8d#0r8d16r8f#8r8d0r8b16r8g16r8d16r8d16r96f0r8c8r8++e8r8e0r8c0r8-c#8r8g#0r8a8r44g#4r8+d#16r8d#16r8d#16r20f4r8g16r20g#4r8c0r8d#8r8c0r8d#8r48c8r8-d#8r8g0r8a#8r8g0r8d8r8g16r8d#40r26+d0r",
" 0r12-d#4r20b12r8+d#8r8f16r8a0r8g#16r8g#8r28g28r8+c16r8c32r8c208r8c0r8d#8r8c0r8d#8r48c8r8-d#8r8g0r8a#8r8g0r8d8r8g16r8d#48r8c8r8+e16r8e16r8d40r8e16r8e16r8d64r8-e16r8+g24r8-e16r8f16r8d#16r8c#8r8+c64r20c4r8d#16r20f4r8-d#0r8a#16r8d#16r8-e8r4f#0r4f0r24e0r40d#0r8c0r8g#8r8b16r8a#0r8d#32r32a#0r9g0r",
" 0r8c8r20d12r8c8r8c16r8f#24r8f8r24f32r8f16r8f8r8f16r8c#16r8e0r8g16r8f80r20d12r8c8r8f16r8f#0r8g16r8a#16r8e8r8g0r8f#8r8g0r8a#16r8c32r8d16r8c48r8f#8r8a#0r8c8r8b16r8b0r8b8r8g0r8e8r8a#0r8c8r8a0r8c8r8a0r8a8r8c24r8-g16r8b8r8+b24r8b16r8c16r24-f#0r8g#16r24f0r24g0r8--g#16r8g#16r8g#16r24+++c0r8g16r8a#16r8-a#16r8a#16r8g#16r8g#16r8d8r8g#16r8g48r9g15r9c#0r",
" 24r12--g#12r8g#16r8g#8r8+a24r8f8r8f#0r8g16r8b40r8+c#8r8c#40r8c#0r8d#136r8d#8r8c16r8d#0r8d#40r8a#16r8d16r8c16r8d#184r8g8r8e0r8c8r8f#16r8f16r8f0r8f40r8-b16r72e0r24d#0r8b88r24a#0r24g#0r24g0r16g#0r8a0r12a#4r4a0r4g#0r40g120r8+g40r20+a#0r",
" 88r8--a0r8a#16r8c#8r8d0r8d#16r8g#8r8a0r16a#8r8+f16r8g16r8a#16r8g#16r8g#16r8g8r8b0r8g8r8d#0r24d#0r24f96r8e88r8d8r8g#16r8g96r8f#16r8b112r8b8r8c#0r8d40r8a16r8+g#80r8g#0r8c#8r8b16r8g16r20f4r8g16r20g#4r8a0r8d#40r8e8r8g0r8f#8r8g0r8a#16r8c32r8d16r8c40r26g0r",
" 216r8--f16r8d#16r8a#16r8f16r8a#16r8d#16r8a8r8d#0r12g#12r12g#12r8g#16r8g#8r8a0r8a#16r8d#16r8g16r8c16r8f40r8-a#40r8d#16r8a#88r8+d16r8d64r8a16r8g16r8b64r8f#16r8b16r8e16r8b16r8a#16r8d#16r8g#16r8g#16r8g#8r20+++c4r8a64r4+a#4r4g4r4e4r4c2r2f#0r4g12r8g24r8a#8r8-d16r8d#40r26c0r",
" 1176r8c32r20f4r8f#48r8a#16r8d16r8c16r8d#32r8b16r8a#40r32d0r",
" 1224r8---g#8r8+++++c0r8d#8r8c0r8d#8r44c76r4f#0r8g12r8d#0r",
" 1240r8+f#96r8a#8r8g0r8a#8r8g16r8g16r8c40r20f0r",
" 1240r8---a0r8a#136r8a#16r8a#16r8d#8r8a#24r9d#15r9d#0r",]}