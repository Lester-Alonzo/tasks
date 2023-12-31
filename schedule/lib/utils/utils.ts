import {CurrentDoc, TASK_TYPE} from '@/lib/types/global'
/**
 * @typedef {import('../types/global').CurrentDoc} CurrentDoc
 */

type DAYS = {
  [key: number]: string;
}
type RE_HAVEDAY = {have:boolean, day:string}

export const MAP_DAYS:DAYS = {
  0: 'Do',
  1: 'Lu',
  2: 'Ma',
  3: 'Mi',
  4: 'Ju',
  5: 'Vi',
  6: 'Sa'
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
function eliminarArroba(texto: string): string {
    return texto.replace(/@/g, '');
}
function eliminarPercentaje(texto: string): string {
    return texto.replace(/%/g, '');
}
function changeWatch(texto: string): string {
    return texto.replace(/watch\?v=/g, 'embed/');
}
/**
 * Recibe un string, devuelve un objeto del tipo doc
 * @param {string} doc  - El string a parsear
 * @return {CurrentDoc} - El objeto parseado
 */
export function parseDoc(doc: string): CurrentDoc {
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
  }else if(type === '@'){
    return {
      content: arrstring.slice(1).join(' '),
      type: 'link',
      url: eliminarArroba(arrstring.slice(1).join(' '))
    }
  }else if(type === '%'){
    return {
      content: arrstring.slice(1).join(' '),
      type: 'image',
      url: eliminarPercentaje(arrstring.slice(1).join(' '))
    }
  }else if(type === '*') {
    return {
      content: changeWatch(arrstring.slice(1).join(' ')),
      type: 'yt',
      url: changeWatch(arrstring.slice(1).join(' '))
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

export function ReturnedDay(day:number) {
  return MAP_DAYS[day]
}

export function EstaCoins(type:TASK_TYPE) {
 if(type === 'UI') return 100
 if(type === 'NUI') return 60
 if(type === 'UNI') return 80
 if(type === 'NUNI') return 20
}
export function BadCoins(type:TASK_TYPE) {
 if(type === 'UI') return 50
 if(type === 'NUI') return 30
 if(type === 'UNI') return 20
 if(type === 'NUNI') return 10
}