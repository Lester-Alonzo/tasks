import {CurrentDoc, TASK_TYPE} from '@/lib/types/global'
/**
 * @typedef {import('../types/global').CurrentDoc} CurrentDoc
 */

type DAYS = {
  [key: number]: string;
}
type RE_HAVEDAY = {have:boolean, day:string}

export const MAP_DAYS:DAYS = {
  0: 'Domingo',
  1: 'Lunes',
  2: 'Martes',
  3: 'Miercoles',
  4: 'Jueves',
  5: 'Viernes',
  6: 'Sabado'
}

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64 = reader.result as string;
      resolve(base64);
    };
    reader.onerror = (error) => reject(error);
  });
}

/**
 * Calculates the number of days between a given date and today's date.
 * @param date - The date to compare to today's date in string format (YYYY-MM-DD).
 * @returns The number of days between the given date and today's date.
 */
export function PassDays(date:string) {
  const today = new Date();
  const date2 = new Date(date);  

  const diffTime = Math.abs(date2.getTime() - today.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}
/**
 * Recibe un string, devuelve un objeto del tipo doc
 * @param {string} doc  - El string a parsear
 * @return {CurrentDoc} - El objeto parseado
 */
export function parseDoc(doc: string, url:string): CurrentDoc {
  const arrstring = doc.split(' ');
  const type = arrstring[0].toLowerCase()
  if(type == '#') {
    return {
      content: arrstring.slice(1).join(' '),
      type: 'title'
    }
  }else if(type === '-'){
    return {
      content: arrstring.slice(1).join(' '),
      type: 'separetor'
    }
  }else if(type === '@' && url){
    return {
      content: arrstring.slice(1).join(' '),
      type: 'link',
      url: url
    }
  }
  return {
    content: doc,
    type: 'text'
  }
}
/**
 * 
 * @param {number[]} days - Los dias que se quieren evaluar o 'all' que es una tarea diaria
 * @returns {RE_HAVEDAY} - {have: boolean, day: string}
 */
export function EvaluateHaveThisDay(days:number[] | 'all'):RE_HAVEDAY  {
  const today = new Date();
  const day = today.getDay();

  if(days === 'all') return {have: true, day: MAP_DAYS[day]}

  const have = days.includes(day);
  return {have, day: MAP_DAYS[day]}


}

export function EstaCoins(type:TASK_TYPE) {
 if(type === 'UI') return 100
 if(type === 'NUI') return 60
 if(type === 'UNI') return 80
 if(type === 'NUNI') return 20
}