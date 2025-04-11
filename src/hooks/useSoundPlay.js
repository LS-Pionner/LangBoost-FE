import instance from "@/axios";

export function useSoundPlay() {
    const soundPlay = async (language, text) => {
        try {
            // 요청 데이터
            const requestData = {
                language: language,
                text: text
            }

            const res = await instance.post('/api/v1/tts/generate', requestData, {
                responseType: 'blob',   // 응답 데이터로 이진 데이터(byte[])를 받기 위해 지정
            });

            // 서버에서 받은 데이터로 Blob 객체 생성
            const blob = new Blob([res.data], { type: 'audio/mpeg' });  // MIME 타입 지정
            const url = URL.createObjectURL(blob);  // Blob 객체로 URL 생성 (<audio> 태그의 src 속성으로 사용 가능)
            console.log('>>', url);

            // audio 객체 생성 및 재생
            const audio = new Audio(url);
            audio.play();

            // url 객체 해제 (메모리 관리)
            audio.onended = () => URL.revokeObjectURL(url);
        } catch(error) {
            console.log('TTS 재생 중 오류 발생', error);
            alert('TTS 재생 중 오류가 발생했습니다.');
        }
    };

    return {
        soundPlay,
    };
}
