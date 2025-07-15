// frontend/src/features/admin/api/boardApi.js
// 🚩 여기서는 백엔드 모델이나 Sequelize를 import 할 필요가 없어.
import { apiService } from '@/shared'; // apiService 경로를 너의 프로젝트 구조에 맞게 확인해줘.

// 모든 게시글 가져오기 (enumType 필터링 기능 추가)
export const getAllBoards = async (enumType = '') => {
  try {
    const url = enumType ? `/admin/board?enum=${enumType}` : '/admin/board';
    const response = await apiService.get(url);
    return { success: true, data: response.data || [] };
  } catch (error) {
    console.error('API Error: getAllBoards', error);
    return { success: false, message: error.response?.data?.message || '게시글 불러오기 실패' };
  }
};

export const getBoardById = async (boardId) => {
  try {
    const response = await apiService.get(`/admin/board/${boardId}`);
    return { success: true, data: response.data };
  } catch (error) {
    console.error('API Error: getBoardById', error);
    return { success: false, message: error.response?.data?.message || '특정 게시글 불러오기 실패' };
  }
};

export const createBoard = async (newBoardData) => {
  try {
    const response = await apiService.post('/admin/board', newBoardData);
    return { success: response.status === 201, data: response.data, message: '게시글이 성공적으로 작성되었습니다.' };
  } catch (error) {
    console.error('API Error: createBoard', error);
    return { success: false, message: error.response?.data?.message || '게시글 작성 실패' };
  }
};

export const updateBoard = async (boardId, updatedBoardData) => {
  try {
    const response = await apiService.put(`/admin/board/${boardId}`, updatedBoardData);
    return { success: response.status === 200, message: response.data.message || '게시글이 성공적으로 수정되었습니다.' };
  } catch (error) {
    console.error('API Error: updateBoard', error);
    return { success: false, message: error.response?.data?.message || '게시글 수정 실패' };
  }
};

export const deleteBoard = async (boardId) => {
  try {
    const response = await apiService.delete(`/admin/board/${boardId}`);
    return { success: response.status === 200, message: response.data.message || '게시글이 성공적으로 삭제되었습니다.' };
  } catch (error) {
    console.error('API Error: deleteBoard', error);
    return { success: false, message: error.response?.data?.message || '게시글 삭제 실패' };
  }
};